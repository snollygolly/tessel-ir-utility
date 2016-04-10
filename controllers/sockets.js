"use strict";

const config = require("../config.json");
const app = require("../index").app;
const io = app.io;

const co = require("co");

const ir = require("../models/ir.js");

io.on("status", (ctx, data) => {
	io.socket.emit("status", ir.ready);
});

module.exports.ready = function ready() {
	// Broadcasts to all other connections
	io.broadcast("ready", "OK");
};

module.exports.received = function received(data) {
	// Broadcasts to all other connections
	io.broadcast("received", data);
};

module.exports.discarded = function discarded(data) {
	// Broadcasts to all other connections
	io.broadcast("discarded", data);
};

module.exports.die = function die() {
	// Broadcasts to all other connections
	io.broadcast("die", "OK");
};

function onError(err) {
	// log any uncaught errors
	// co will not throw any errors you do not handle!!!
	// HANDLE ALL YOUR ERRORS!!!
	console.error(err.stack);
	console.log("***: Dying...");
	module.exports.die();
	return process.exit();
}
