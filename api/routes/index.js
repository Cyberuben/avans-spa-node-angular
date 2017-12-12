const router = require("express").Router();
const ValidationError = require("mongoose/lib/error/validation");

router.use("/diplomas", require("./diplomas"));
router.use("/employees", require("./employees"));
router.use("/skills", require("./skills"));

router.get("/test", (req, res, next) => {
	res.status(200).json({
		results: [
			"string1",
			"string2",
			"string3"
		]
	});
})

router.use((err, req, res, next) => {
	if(err instanceof ValidationError) {
		Object.keys(err.errors).forEach((key) => {
			err.errors[key] = {
				message: err.errors[key].message,
				type: err.errors[key].name
			}
		});

		res.status(400).json({
			errors: err.errors
		});

		return;
	}

	next(err);
});

module.exports = router;