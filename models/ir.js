"use strict";

const config = require("../config.json");
const sockets = require("../controllers/sockets");

const Promise = require("bluebird");
const co = require("co");
const fs = require("fs");
const path = require("path");

const tessel = require("tessel");
const infraredlib = require("ir-attx4");
const infrared = Promise.promisifyAll(infraredlib.use(tessel.port["A"]));

module.exports.ready = false;

// When we"re connected
infrared.on("ready", () => {
	console.log("Connected to IR!");
	module.exports.ready = true;
	sockets.broadcast("ready", null);
});

// If we get data, print it out
infrared.on("data", (data) => {
	const now = Date.now();
	const code = data.toJSON().data;
	console.log(`Received RX Data: ${data.toJSON().data.length}`);
	if (code.length <= config.site.options.discard_length) {
		// not sure what this is, I don't want it though
		console.log("Discarding...");
		sockets.broadcast("discarded", code);
		return;
	}
	const filePath = path.resolve(__dirname, "..", `captures/${now}.json`);
	fs.writeFileSync(filePath, JSON.stringify(code));
	console.log(`Wrote file as ${now}.json`);
	sockets.broadcast("received", {
		data: code,
		name: `${now}.json`
	});
});

module.exports.send = function* send(data) {
	const filePath = path.resolve(__dirname, "..", `captures/${data}`);
	const rawCapture = fs.readFileSync(filePath);
	const capture = JSON.parse(rawCapture);
	const result = yield infrared.sendRawSignalAsync(38, new Buffer(capture));
	return result;
};
