const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SkillSchema = new Schema({
	name: {
		type: String,
		validate: {
			validator: (name) => name.length > 2,
			message: "Naam is te kort"
		},
		required: [true, "Naam is verplicht"]
	}
});

const Skill = mongoose.model("skill", SkillSchema);

module.exports = Skill;