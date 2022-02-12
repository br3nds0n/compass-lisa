const router = require('express').Router();

const CarController = require('../../../app/controller/CarController');
const tokenBearer = require('../../../app/middlewares/tokenBearer');

const validationBodyCar = require('../../../app/validation/car/validationBodyCar');
const validationFind = require('../../../app/validation/car/findAll');
const validationId = require('../../../app/validation/validationId');
const validationPatch = require('../../../app/validation/car/validationPatch');

router
	.post('/car', tokenBearer, validationBodyCar, CarController.create)
	.get('/car', tokenBearer, validationFind, CarController.findAll)
	.delete('/car/:id', tokenBearer, validationId, CarController.delete)
	.put('/car/:id', tokenBearer, validationId, validationBodyCar, CarController.update)
	.get('/car/:id', tokenBearer, validationId, CarController.getById)
	.patch('/car/:id/acessorios/:acessorioId', tokenBearer, validationPatch, CarController.updateAccessory);

module.exports = router;
