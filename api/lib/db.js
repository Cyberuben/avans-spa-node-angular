const mongoose = require("mongoose");

mongoose.Promise = global.Promise;

mongoose.connect(process.env.MONGODB_URI);
mongoose.connection
.once("open", () => {
	console.log("Connected to MongoDB");
})
.on("error", (err) => {
	console.error("Error connecting to Mongo", err);
});