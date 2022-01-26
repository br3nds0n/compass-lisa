const router = require('express').Router()

const carRouter = require('./carRouter')
const person = require('./personRouter')
const authenticate = require('./authenticateRouter')

router.use(carRouter, person, authenticate)

module.exports = router
