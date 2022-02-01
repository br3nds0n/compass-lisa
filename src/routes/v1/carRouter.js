const router = require('express').Router();

const CarController = require('../../app/controller/CarController');

const validationBodyCar = require('../../app/validation/car/validationBodyCar');
const validationFind = require('../../app/validation/car/findAll');
const validationId = require('../../app/validation/validationId');

router
	.post('/car', validationBodyCar, CarController.create)
	.get('/car', validationFind, CarController.findAll)
	.delete('/car/:id', validationId, CarController.delete)
	.put('/car/:id', validationId, validationBodyCar, CarController.update)
	.get('/car/:id', validationId, CarController.getById);

module.exports = router;
