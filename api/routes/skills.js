const router = require("express").Router();
const Skill = require("../models/skill");
const neo4j = require("../lib/neo4j");

router.get("/", (req, res, next) => {
	Skill.find({})
	.sort({ name: 1 })
	.then((skills) => {
		res.status(200).json(skills);
	})
	.catch(next);
});

router.post("/", (req, res, next) => {
	const skill = new Skill({
		name: req.body.name
	});

	skill.save()
	.then(() => {
		return neo4j.run(
			`CREATE (:Skill {id: $id, name: $name})`,
			{
				id: skill._id.toString(),
				name: req.body.name
			}
		)
		.then(() => {
			res.status(200).json(skill);
		});
	})
	.catch(next);
});

router.get("/:skillId", (req, res, next) => {
	Skill.findOne({
		_id: req.params.skillId
	})
	.then((skill) => {
		if(!skill) {
			res.status(404).json({
				error: "Not found"
			});

			return;
		}

		res.status(200).json(skill);
	})
	.catch(next);
});

router.put("/:skillId", (req, res, next) => {
	Skill.findOne({
		_id: req.params.skillId
	})
	.then((skill) => {
		if(!skill) {
			res.status(404).json({
				error: "Not found"
			});

			return;
		}

		skill.set("name", req.body.name || skill.name);
		return skill.save()
		.then(() => {
			return neo4j.run(
				`MATCH (s:Skill)
				WHERE s.id = $id
				SET s.name = $name`,
				{
					id: skill._id.toString(),
					name: skill.name
				}
			)
			.then(() => {
				res.status(200).json(skill);
			});
		});
	})
	.catch(next);
});

router.delete("/:skillId", (req, res, next) => {
	Skill.findByIdAndRemove(req.params.skillId)
	.then(() => {
		return neo4j.run(
			`MATCH (s:Skill)
			WHERE s.id = $id
			DELETE s`,
			{
				id: req.params.skillId
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