const router = require("express").Router();
const Employee = require("../models/employee");

router.get("/", (req, res, next) => {
	Employee.find({})
	.sort({ name: 1 })
	.then((employees) => {
		res.status(200).json({
			employees: employees
		});
	})
	.catch(next);
});

router.post("/", (req, res, next) => {
	const employee = new Employee({
		name: req.body.employee,
		email: req.body.email,
		registration: req.body.registration
	});

	employee.save()
	.then(() => {
		res.status(200).json({
			employee: employee
		});
	})
	.catch(next);
});

router.get("/:employeeId", (req, res, next) => {
	Employee.findOne({
		_id: req.params.employeeId
	})
	.then((employee) => {
		if(!employee) {
			res.status(404).json({
				employee: null,
				error: "Not found"
			});

			return;
		}

		res.status(200).json({
			employee: employee
		});
	})
	.catch(next);
});

router.put("/:employeeId", (req, res, next) => {
	Employee.findOne({
		_id: req.params.employeeId
	})
	.then((employee) => {
		if(!employee) {
			res.status(404).json({
				employee: null,
				error: "Not found"
			});

			return;
		}

		employee.set("name", req.body.name || employee.name);
		employee.set("email", req.body.email || employee.email);
		employee.set("registration", req.body.registration || employee.registration);
		return employee.save()
		.then(() => {
			res.status(200).json({
				employee: employee
			});
		});
	})
	.catch(next);
});

router.delete("/:employeeId", (req, res, next) => {
	Employee.findByIdAndRemove(req.params.employeeId)
	.then(() => {
		res.status(200).json({
			success: true
		});
	})
	.catch(next);
});

module.exports = router;