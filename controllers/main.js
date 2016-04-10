"use strict";

const config = require("../config.json");

module.exports.account = function* account() {
	yield this.render("account", {title: config.site.name});
};
