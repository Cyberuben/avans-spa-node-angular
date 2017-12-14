const router = require("express").Router();
const Employee = require("../models/employee");
const Diploma = require("../models/diploma");
const neo4j = require("../lib/neo4j");

router.get("/", (req, res, next) => {
	Employee.find({})
	.sort({ name: 1 })
	.then((employees) => {
		res.status(200).json(employees);
	})
	.catch(next);
});

router.post("/", (req, res, next) => {
	const employee = new Employee({
		name: req.body.name,
		email: req.body.email,
		registration: req.body.registration
	});

	employee.save()
	.then(() => {
		return neo4j.run(
			`CREATE (:Employee {id: $id, name: $name, email: $email, registration: $registration})`,
			{
				id: employee._id.toString(),
				name: req.body.name,
				email: req.body.email,
				registration: req.body.registration
			}
		)
		.then(() => {
			res.status(200).json(employee);
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
				error: "Not found"
			});

			return;
		}

		res.status(200).json(employee);
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
				error: "Not found"
			});

			return;
		}

		employee.set("name", req.body.name || employee.name);
		employee.set("email", req.body.email || employee.email);
		employee.set("registration", req.body.registration || employee.registration);
		return employee.save()
		.then(() => {
			return neo4j.run(
				`MATCH (e:Employee)
				WHERE e.id = $id
				SET e.name = $name
				SET e.email = $email
				SET e.registration = $registration`,
				{
					id: employee._id.toString(),
					name: employee.name,
					email: employee.email,
					registration: employee.registration
				}
			)
			.then(() => {
				res.status(200).json(employee);
			});
		});
	})
	.catch(next);
});

router.get("/:employeeId/diplomas", (req, res, next) => {
	Employee.findOne({
		_id: req.params.employeeId
	})
	.then((employee) => {
		if(!employee) {
			res.status(404).json({
				error: "Employee not found"
			});

			return;
		}

		return neo4j.run(
			`MATCH (e:Employee{id: $employeeId})-[ed:PASSED]->(d:Diploma)			
			RETURN d.id, d.name, d.datePassed`,
			{
				employeeId: employee._id.toString()
			}
		)
		.then((result) => {
			res.status(200).json(result.records);
		});
	})
	.catch(next);
});

router.post("/:employeeId/diplomas", (req, res, next) => {
	Employee.findOne({
		_id: req.params.employeeId
	})
	.then((employee) => {
		if(!employee) {
			res.status(404).json({
				error: "Employee not found"
			});

			return;
		}

		return Diploma.findOne({
			_id: req.body.id
		})
		.then((diploma) => {
			if(!diploma) {
				res.status(404).json({
					error: "Diploma not found"
				});

				return;
			}

			return neo4j.run(
				`MATCH (e:Employee{id: $employeeId}), (d:Diploma{id: $diplomaId})
				CREATE (e)-[:PASSED{datePassed: $datePassed}]->(d)`,
				{
					diplomaId: diploma._id.toString(),
					employeeId: employee._id.toString(),
					datePassed: req.body.datePassed
				}
			)
			.then(() => {
				res.status(200).json({
					success: true
				});
			});
		});
	})
	.catch(next);
});

router.delete("/:employeeId/diplomas/:diplomaId", (req, res, next) => {
	neo4j.run(
		`MATCH (e:Employee{id: $employeeId})-[rel:PASSED]->(d:Diploma{id: $diplomaId})
		DELETE rel`,
		{
			diplomaId: req.params.diplomaId,
			employeeId: req.params.employeeId
		}
	)
	.then(() => {
		res.status(200).json({
			success: true
		});
	})
	.catch(next);
});

router.get("/:employeeId/diplomas", (req, res, next) => {
	Employee.findOne({
		_id: req.params.employeeId
	})
	.then((employee) => {
		if(!employee) {
			res.status(404).json({
				error: "Employee not found"
			});

			return;
		}

		return neo4j.run(
			`MATCH (e:Employee{id: $employeeId})-[ed:PASSED]->(d:Diploma)-[ds:GRANTS]->(s:Skill)		
			RETURN s.name, d.name, MIN(ed.datePassed)`,
			{
				employeeId: employee._id.toString()
			}
		)
		.then((result) => {
			res.status(200).json(result.records);
		});
	})
	.catch(next);
});

router.delete("/:employeeId", (req, res, next) => {
	Employee.findByIdAndRemove(req.params.employeeId)
	.then(() => {
		return neo4j.run(
			`MATCH (e:Employee)
			WHERE e.id = $id
			DELETE e`,
			{
				id: req.params.employeeId
			}
		)
		.then(() => {
			res.status(200).json({
				success: true
			});
		});
	})
	.catch(next);
});

module.exports = router;