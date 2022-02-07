const router = require('express').Router();

const carRouter = require('./components/carRouter');
const person = require('./components/personRouter');
const authenticate = require('./components/authenticateRouter');

router.use(carRouter, person, authenticate);

module.exports = router;
