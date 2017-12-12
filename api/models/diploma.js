const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DiplomaSchema = new Schema({
	name: {
		type: String,
		validate: {
			validator: (name) => name.length > 2,
			message: "Naam is te kort"
		},
		required: [true, "Naam is verplicht"]
	},
	type: {
		type: String,
		required: [true, "Type is verplicht"]
	}
});

const Diploma = mongoose.model("diploma", DiplomaSchema);

module.exports = Diploma;