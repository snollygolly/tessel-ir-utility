"use strict";

const config = require("./config.json");
const IP = require("os").networkInterfaces().wlan0[0].address;

const koa = require("koa");
const hbs = require("koa-hbs");
const serve = require("koa-static");

const app = koa();

// socket stuff
const KoaSocket = require("koa-socket");
const io = new KoaSocket();

io.attach(app);

exports.app = app;

// for all socket interations
require("./controllers/sockets");

// misc handlebars helpers
require("./helpers/handlebars");

// statically serve assets
app.use(serve(`${__dirname}`));

// load up the handlebars middlewear
app.use(hbs.middleware({

	viewPath: `${__dirname}/views`,
	layoutsPath: `${__dirname}/views/layouts`,
	partialsPath: `${__dirname}/views/partials`,
	defaultLayout: "main"
}));

app.use(function* error(next) {
	try {
		yield next;
	} catch (err) {
		this.status = err.status || 500;
		this.body = err.message;
		this.app.emit("error", err, this);
	}
});

require("./routes");

console.log(`${config.site.name} is now listening on http://${IP}:${config.site.port}`);
app.listen(config.site.port);

process.on("SIGINT", function exit() {
	process.exit();
});
