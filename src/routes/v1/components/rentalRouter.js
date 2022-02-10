const router = require('express').Router();
const RentalController = require('../../../app/controller/RentalController');


router
	.post('/rental', RentalController.create);

module.exports = router;