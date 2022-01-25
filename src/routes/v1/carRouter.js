const router = require('express').Router()

const CarController = require('../../app/controller/carController')
const validationCreate = require('../../app/validation/car/body/create')
const validationFind = require('../../app/validation/car/query/findAll')

router
  .post('/car', validationCreate, CarController.create)
  .get('/car', validationFind, CarController.findAll)
  .delete('/car/:id', CarController.delete)
  .put('/car/:id', CarController.update)

module.exports = router
