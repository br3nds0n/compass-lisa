const router = require('express').Router()

const CarController = require('../../app/controller/carController')
const validationCreate = require('../../app/validation/car/create')

router
  .post('/car', validationCreate, CarController.create)
  .get('/car', CarController.findAll)

module.exports = router
