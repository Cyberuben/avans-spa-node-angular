const assert = require("assert");
const mongoose = require("mongoose");
const Skill = require("../models/skill");

describe("Create skill in the database", () => {
	before((done) => {
		mongoose.connection.collections.skills.drop(() => {
			done();
		});
	});

	it("saves a skill", (done) => {
		const skill = new Skill({
			name: "testSkill"
		});

		skill.save()
		.then(() => {
			assert(!skill.isNew);
			done();
		})
	});

	it("only has one skill", (done) => {
		Skill.find()
		.then((skills) => {
			assert(skills.length == 1);
			done();
		});
	});
});

describe("Read skills in the database", () => {
	let testSkill;

	before((done) => {
		mongoose.connection.collections.skills.drop(() => {
			done();
		});
	});

	beforeEach((done) => {
		testSkill = new Skill({ name: "testSkill" });
		testSkill.save()
			.then(() => done());
	});

	it("finds all skills with a certain name", (done) => {
		Skill.find({name: "testSkill" })
		.then((skills) => {
			assert(skills.length == 1);
			assert(skills[0]._id.toString() === testSkill._id.toString());
			done();
		});
	});

	it("find a single skill", (done) => {
		Skill.findById(testSkill._id)
		.then((skill) => {
			assert(skill != null);
			done();
		});
	});
});

describe("Delete a skill from the database", () => {
	let testSkill;

	before((done) => {
		mongoose.connection.collections.skills.drop(() => {
			done();
		});
	});

	beforeEach((done) => {
		testSkill = new Skill({ name: "testSkill" });
		testSkill.save()
			.then(() => done());
	});

	it("deletes a skill", (done) => {
		Skill.findByIdAndRemove(testSkill._id)
		.then(() => {
			return Skill.findById(testSkill._id)
			.then((skill) => {
				assert(skill == null);
				done();
			});
		})
	});
});