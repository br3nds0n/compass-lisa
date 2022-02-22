const router = require('express').Router();

const LocationController = require('../../../app/controller/LocationController');
const validationBody = require('../../../app/validation/location/validationBody');
const validationId = require('../../../app/validation/validationId');

router.post('/rental/:id/reserve', validationBody, validationId, LocationController.create);

module.exports = router;
