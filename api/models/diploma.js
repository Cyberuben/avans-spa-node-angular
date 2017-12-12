const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DiplomaSchema = new Schema({
	name: String,
	type: String
});

const Diploma = mongoose.model("diploma", DiplomaSchema);

module.exports = Diploma;