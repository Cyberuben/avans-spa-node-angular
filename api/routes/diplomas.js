const router = require("express").Router();
const Diploma = require("../models/diploma");

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
		res.status(200).json(diploma);
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
			res.status(200).json(diploma);
		});
	})
	.catch(next);
});

router.delete("/:diplomaId", (req, res, next) => {
	Diploma.findByIdAndRemove(req.params.diplomaId)
	.then(() => {
		res.status(200).json({
			success: true
		});
	})
	.catch(next);
});

module.exports = router;