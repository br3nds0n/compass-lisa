const router = require('express').Router()

const CarController = require('../../app/controller/carController')

router
  .post('/car', CarController.create)

module.exports = router
