const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SkillSchema = new Schema({
	name: String
});

const Skill = mongoose.model("skill", SkillSchema);

module.exports = Skill;