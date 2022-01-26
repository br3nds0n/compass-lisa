const router = require('express').Router()

const carRouter = require('./carRouter')

router.use(carRouter)

module.exports = router
