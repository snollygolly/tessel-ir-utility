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
	sockets.ready();
});

// If we get data, print it out
infrared.on("data", (data) => {
	const now = Date.now();
	const code = data.toJSON().data;
	console.log(`Received RX Data: ${data.toString("hex").length}`);
	if (code.length <= config.site.options.discard_length) {
		// not sure what this is, I don't want it though
		console.log("Discarding...");
		sockets.discarded(code);
		return;
	}
	const filePath = path.resolve(__dirname, "..", `captures/${now}.json`);
	fs.writeFileSync(filePath, JSON.stringify(code));
	console.log(`Wrote file as ${now}.json`);
	sockets.received(code);
});
