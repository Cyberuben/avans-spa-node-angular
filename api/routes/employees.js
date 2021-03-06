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
			RETURN d.id AS diplomaId, d.name AS diplomaName, ed.datePassed AS datePassed`,
			{
				employeeId: employee._id.toString()
			}
		)
		.then((result) => {
			res.status(200).json(result.records.map((row) => {
				var data = {};
				row.keys.forEach((key, index) => {
					data[key] = row._fields[index];
				});
				return data;
			}));
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
				return neo4j.run(
					`MATCH (d:Diploma{id: $diplomaId})-[:GRANTS]->(s:Skill), (e:Employee{id: $employeeId})
					CREATE (e)-[:HAS_SKILL{diplomaId: $diplomaId}]->(s)`,
					{
						diplomaId: diploma._id.toString(),
						employeeId: employee._id.toString()
					}
				)
			})
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
		return neo4j.run(
			`MATCH (e:Employee{id: $employeeId})-[rel:HAS_SKILL{diplomaId: $diplomaId}]->(s:Skill)
			DELETE rel`,
			{
				diplomaId: req.params.diplomaId,
				employeeId: req.params.employeeId
			}
		);
	})
	.then(() => {
		res.status(200).json({
			success: true
		});
	})
	.catch(next);
});

router.get("/:employeeId/skills", (req, res, next) => {
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
			`MATCH (e:Employee{id: $employeeId})-[es:HAS_SKILL]->(s:Skill)
			RETURN DISTINCT s, s.name AS skillName`,
			{
				employeeId: employee._id.toString()
			}
		)
		.then((result) => {
			res.status(200).json(result.records.map((row) => {
				var data = {};
				row.keys.forEach((key, index) => {
					data[key] = row._fields[index];
				});
				return data;
			}));
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