"use strict";

const config = require("../config.json");
const app = require("../index").app;
const io = app.io;

const co = require("co");

const ir = require("../models/ir.js");

io.on("status", (ctx, data) => {
	io.socket.emit("status", ir.ready);
});

io.on("send", (ctx, data) => {
	co(function* send() {
		const result = yield ir.send(data);
		if (result) {
			// a result is an error
			throw result;
		}
		io.broadcast("success", null);
	}).catch(onerror);
});

module.exports.broadcast = (event, data) => {
	// gener
	io.broadcast(event, data);
};

function onerror(err) {
	// log any uncaught errors
	// co will not throw any errors you do not handle!!!
	// HANDLE ALL YOUR ERRORS!!!
	io.broadcast("failure", err);
	console.error(err.stack);
}
