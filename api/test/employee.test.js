const assert = require("assert");
const mongoose = require("mongoose");
const Employee = require("../models/employee");

describe("Create employee in the database", () => {
	before((done) => {
		mongoose.connection.collections.employees.drop(() => {
			done();
		});
	});

	it("saves a employee", (done) => {
		const employee = new Employee({
			name: "test employee",
			registration: 1234,
			email: "test@test.com"
		});

		employee.save()
		.then(() => {
			assert(!employee.isNew);
			done();
		})
	});

	it("only has one employee", (done) => {
		Employee.find()
		.then((employees) => {
			assert(employees.length == 1);
			done();
		});
	});
});

describe("Read employees in the database", () => {
	let testEmployee;

	before((done) => {
		mongoose.connection.collections.employees.drop(() => {
			done();
		});
	});

	beforeEach((done) => {
		testEmployee = new Employee({
			name: "testEmployee",
			registration: 1234,
			email: "test@test.com"
		});
		testEmployee.save()
			.then(() => done());
	});

	it("finds all employees with a certain name", (done) => {
		Employee.find({name: "testEmployee" })
		.then((employees) => {
			assert(employees.length == 1);
			assert(employees[0]._id.toString() === testEmployee._id.toString());
			done();
		});
	});

	it("find a single employee", (done) => {
		Employee.findById(testEmployee._id)
		.then((employee) => {
			assert(employee != null);
			done();
		});
	});
});

describe("Delete a employee from the database", () => {
	let testEmployee;

	before((done) => {
		mongoose.connection.collections.employees.drop(() => {
			done();
		});
	});

	beforeEach((done) => {
		testEmployee = new Employee({
			name: "test employee",
			registration: 1234,
			email: "test@test.com"
		});
		testEmployee.save()
			.then(() => done());
	});

	it("deletes a employee", (done) => {
		Employee.findByIdAndRemove(testEmployee._id)
		.then(() => {
			return Employee.findById(testEmployee._id)
			.then((employee) => {
				assert(employee == null);
				done();
			});
		})
	});
});