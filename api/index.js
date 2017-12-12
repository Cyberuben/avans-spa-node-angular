var express = require("express");
var bodyParser = require("body-parser");
var logger = require("morgan");

const path = require("path");

require("dotenv").config();
require("./lib/db");

var app = express();

app.use(bodyParser.urlencoded({
	extended: "true"
}));
app.use(bodyParser.json());

app.set("port", (process.env.PORT || 4200));
app.set("env", (process.env.ENV || "development"));

app.use(logger(process.env.LOG_LEVEL || "dev"));

app.use((req, res, next) => {
	res.setHeader("Access-Control-Allow-Origin", req.headers.origin || "*");
	res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE");
	res.setHeader("Access-Control-Allow-Headers", "X-Requested-With,content-type");
	res.setHeader("Access-Control-Allow-Credentials", true);

	next();
});

app.use("/api", require("./routes"));

app.use(express.static(path.resolve(__dirname, "../frontend/dist")));

app.get("*", (req, res) => {
	res.sendFile(path.resolve(__dirname, "../frontend/dist/index.html"));
});

app.use((err, req, res, next) => {
	var error = {
		message: err.message,
		code: err.code,
		name: err.name,
		status: err.status
	}

	res.status(401).send(error);
});

app.listen(app.get("port"), () => {
	console.log("Server listening on port " + app.get("port"));
});

module.exports = app;
