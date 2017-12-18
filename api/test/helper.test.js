const mongoose = require("mongoose");
const path = require("path");
require("dotenv").config({
	path: path.resolve(__dirname, "../../.env")
});

before((done) => {
	mongoose.connect(process.env.MONGODB_URI_TEST, { useMongoClient: true });
	mongoose.Promise = global.Promise;

	mongoose.connection
	.once("open", () => {
		done();
	})
	.on("error", (err) => {
		console.error(err);
	});
});