const assert = require("assert");
const mongoose = require("mongoose");
const Diploma = require("../models/diploma");

describe("Create diploma in the database", () => {
	before((done) => {
		mongoose.connection.collections.diplomas.drop(() => {
			done();
		});
	});

	it("saves a diploma", (done) => {
		const diploma = new Diploma({
			name: "test diploma",
			type: "opleiding"
		});

		diploma.save()
		.then(() => {
			assert(!diploma.isNew);
			done();
		})
	});

	it("only has one diploma", (done) => {
		Diploma.find()
		.then((diplomas) => {
			assert(diplomas.length == 1);
			done();
		});
	});
});

describe("Read diplomas in the database", () => {
	let testDiploma;

	before((done) => {
		mongoose.connection.collections.diplomas.drop(() => {
			done();
		});
	});

	beforeEach((done) => {
		testDiploma = new Diploma({
			name: "testDiploma",
			type: "opleiding"
		});
		testDiploma.save()
			.then(() => done());
	});

	it("finds all diplomas with a certain name", (done) => {
		Diploma.find({name: "testDiploma" })
		.then((diplomas) => {
			assert(diplomas.length == 1);
			assert(diplomas[0]._id.toString() === testDiploma._id.toString());
			done();
		});
	});

	it("find a single diploma", (done) => {
		Diploma.findById(testDiploma._id)
		.then((diploma) => {
			assert(diploma != null);
			done();
		});
	});
});

describe("Delete a diploma from the database", () => {
	let testDiploma;

	before((done) => {
		mongoose.connection.collections.diplomas.drop(() => {
			done();
		});
	});

	beforeEach((done) => {
		testDiploma = new Diploma({
			name: "test diploma",
			type: "opleiding"
		});
		testDiploma.save()
			.then(() => done());
	});

	it("deletes a diploma", (done) => {
		Diploma.findByIdAndRemove(testDiploma._id)
		.then(() => {
			return Diploma.findById(testDiploma._id)
			.then((diploma) => {
				assert(diploma == null);
				done();
			});
		})
	});
});