const router = require('express').Router();

const PersonController = require('../../../app/controller/PersonController');

const validationBodyPerson = require('../../../app/validation/person/validationBodyPerson');
const validationId = require('../../../app/validation/validationId');
const validationQuery = require('../../../app/validation/person/findAll');

router
	.post('/people', validationBodyPerson, PersonController.create)
	.get('/people', validationQuery, PersonController.findAll)
	.delete('/people/:id', validationId, PersonController.delete)
	.put('/people/:id', validationId, validationBodyPerson, PersonController.update)
	.get('/people/:id', validationId, PersonController.getById);

module.exports = router;
