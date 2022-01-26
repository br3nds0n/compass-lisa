const router = require('express').Router()

const carRouter = require('./carRouter')
const person = require('./personRouter')

router.use(carRouter, person)

module.exports = router
