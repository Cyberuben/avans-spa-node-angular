const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const EmployeeSchema = new Schema({
	name: {
		type: String,
		validate: {
			validator: (name) => name.length > 2,
			message: "Naam is te kort"
		},
		required: [true, "Naam is verplicht"]
	},
	email: {
		type: String,
		validate: {
			validator: (email) => email.length > 2,
			message: "Email is te kort"
		},
		required: [true, "Email is verplicht"]
	},
	registration: {
		type: Number,
		validate: {
			validator: (registration) => registration > 0,
			message: "Registratie ID moet groter dan 0 zijn"
		},
		required: [true, "Registratie ID is verplicht"]
	}
});

const Employee = mongoose.model("employee", EmployeeSchema);

module.exports = Employee;