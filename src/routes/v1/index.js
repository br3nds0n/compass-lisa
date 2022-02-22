const router = require('express').Router();

const carRouter = require('./components/carRouter');
const person = require('./components/personRouter');
const authenticate = require('./components/authenticateRouter');
const rentalRouter = require('./components/rentalRouter');
const swaggerRouter = require('./documentation/swaggerRouter');
const locationRouter = require('./components/locationRouter');

router.use(carRouter, person, authenticate, rentalRouter, swaggerRouter, locationRouter);

module.exports = router;
