const router = require('express').Router()

const CarController = require('../../app/controller/carController')
const validationCreate = require('../../app/validation/car/body/create')
const validationQuery = require('../../app/validation/car/query/findAll')

router
  .post('/car', validationCreate, CarController.create)
  .get('/car', validationQuery, CarController.findAll)

module.exports = router
