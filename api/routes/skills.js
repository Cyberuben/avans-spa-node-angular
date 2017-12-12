const router = require("express").Router();
const Skill = require("../models/skill");

router.get("/", (req, res, next) => {
	Skill.find({})
	.sort({ name: 1 })
	.then((skills) => {
		res.status(200).json({
			skills: skills
		});
	})
	.catch(next);
});

router.post("/", (req, res, next) => {
	const skill = new Skill({
		name: req.body.skill,
		email: req.body.email,
		registration: req.body.registration
	});

	skill.save()
	.then(() => {
		res.status(200).json({
			skill: skill
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
				skill: null,
				error: "Not found"
			});

			return;
		}

		res.status(200).json({
			skill: skill
		});
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
				skill: null,
				error: "Not found"
			});

			return;
		}

		skill.set("name", req.body.name || skill.name);
		return skill.save()
		.then(() => {
			res.status(200).json({
				skill: skill
			});
		});
	})
	.catch(next);
});

router.delete("/:skillId", (req, res, next) => {
	Skill.findByIdAndRemove(req.params.skillId)
	.then(() => {
		res.status(200).json({
			success: true
		});
	})
	.catch(next);
});

module.exports = router;