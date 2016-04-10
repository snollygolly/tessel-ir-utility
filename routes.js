"use strict";

const config = require("./config.json");

const app = require("./index.js").app;
const Router = require("koa-router");

const routes = new Router();

const main = require("./controllers/main.js");

// routes
routes.get("/", function* get() {
	yield this.render("index", {title: config.site.name});
});

routes.get("/account", main.account);

app.use(routes.middleware());
