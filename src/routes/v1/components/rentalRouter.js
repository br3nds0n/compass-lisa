const router = require('express').Router();
const RentalController = require('../../../app/controller/RentalController');


router
	.post('/rental', RentalController.create)
	.get('/rental', RentalController.findAll);

module.exports = router;