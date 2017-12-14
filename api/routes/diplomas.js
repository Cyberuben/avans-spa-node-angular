const router = require("express").Router();
const Diploma = require("../models/diploma");
const Skill = require("../models/skill");
const neo4j = require("../lib/neo4j");

router.get("/", (req, res, next) => {
	Diploma.find({})
	.sort({ name: 1 })
	.then((diplomas) => {
		res.status(200).json(diplomas);
	})
	.catch(next);
});

router.post("/", (req, res, next) => {
	const diploma = new Diploma({
		name: req.body.name,
		type: req.body.type
	});

	diploma.save()
	.then(() => {
		return neo4j.run(
			`CREATE (:Diploma {id: $id, name: $name, type: $type})`,
			{
				id: diploma._id.toString(),
				name: req.body.name,
				type: req.body.type
			}
		)
		.then(() => {
			res.status(200).json(diploma);
		});
	})
	.catch(next);
});

router.get("/:diplomaId/skills", (req, res, next) => {
	Diploma.findOne({
		_id: req.params.diplomaId
	})
	.then((diploma) => {
		if(!diploma) {
			res.status(404).json({
				error: "Diploma not found"
			});

			return;
		}

		return neo4j.run(
			`MATCH (d:Diploma{id: $diplomaId})-[ds:GRANTS]->(s:Skill)
			RETURN s.name AS skillName`,
			{
				diplomaId: diploma._id.toString()
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

router.post("/:diplomaId/skills", (req, res, next) => {
	Diploma.findOne({
		_id: req.params.diplomaId
	})
	.then((diploma) => {
		if(!diploma) {
			res.status(404).json({
				error: "Diploma not found"
			});

			return;
		}

		return Skill.findOne({
			_id: req.body.id
		})
		.then((skill) => {
			if(!skill) {
				res.status(404).json({
					error: "Skill not found"
				});

				return;
			}

			return neo4j.run(
				`MATCH (d:Diploma{id: $diplomaId}), (s:Skill{id: $skillId})
				CREATE (d)-[:GRANTS]->(s)`,
				{
					diplomaId: diploma._id.toString(),
					skillId: skill._id.toString()
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

router.delete("/:diplomaId/skills/:skillId", (req, res, next) => {
	neo4j.run(
		`MATCH (d:Diploma{id: $diplomaId})-[rel:GRANTS]->(s:Skill{id: $skillId})
		DELETE rel`,
		{
			diplomaId: req.params.diplomaId,
			skillId: req.params.skillId
		}
	)
	.then(() => {
		res.status(200).json({
			success: true
		});
	})
	.catch(next);
});

router.get("/:diplomaId", (req, res, next) => {
	Diploma.findOne({
		_id: req.params.diplomaId
	})
	.then((diploma) => {
		if(!diploma) {
			res.status(404).json({
				error: "Not found"
			});

			return;
		}

		res.status(200).json(diploma);
	})
	.catch(next);
});

router.put("/:diplomaId", (req, res, next) => {
	Diploma.findOne({
		_id: req.params.diplomaId
	})
	.then((diploma) => {
		if(!diploma) {
			res.status(404).json({
				error: "Not found"
			});

			return;
		}

		diploma.set("name", req.body.name || diploma.name);
		diploma.set("type", req.body.type || diploma.type);
		return diploma.save()
		.then(() => {
			return neo4j.run(
				`MATCH (d:Diploma)
				WHERE d.id = $id
				SET d.name = $name
				SET d.type = $type`,
				{
					id: diploma._id.toString(),
					name: diploma.name,
					type: diploma.type
				}
			)
			.then(() => {
				res.status(200).json(diploma);
			});
		});
	})
	.catch(next);
});

router.delete("/:diplomaId", (req, res, next) => {
	Diploma.findByIdAndRemove(req.params.diplomaId)
	.then(() => {
		return neo4j.run(
			`MATCH (d:Diploma)
			WHERE d.id = $id
			DELETE d`,
			{
				id: req.params.diplomaId
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