const router = require('express').Router();

const RentalController = require('../../../app/controller/RentalController');

router
	.post('/rental', RentalController.create)
	.get('/rental', RentalController.findAll)
	.get('/rental/:id', RentalController.getById)
	.delete('/rental/:id', RentalController.delete)
	.put('/rental/:id', RentalController.update);

module.exports = router;