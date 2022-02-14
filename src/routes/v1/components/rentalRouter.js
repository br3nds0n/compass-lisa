const router = require('express').Router();

const RentalController = require('../../../app/controller/RentalController');
const validationId = require('../../../app/validation/validationId');
const validationBodyRental = require('../../../app/validation/rental/validationBodyRental');

router
	.post('/rental', validationBodyRental, RentalController.create)
	.get('/rental', RentalController.findAll)
	.get('/rental/:id', validationId, RentalController.getById)
	.delete('/rental/:id', validationId, RentalController.delete)
	.put('/rental/:id', validationId, validationBodyRental, RentalController.update);

module.exports = router;