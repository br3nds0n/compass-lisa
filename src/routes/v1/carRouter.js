const router = require('express').Router()

const carController = require('../../app/controller/carController')
const CarController = require('../../app/controller/carController')

const validationCreate = require('../../app/validation/car/body/create')
const validationUpdate = require('../../app/validation/car/body/update')
const validationFind = require('../../app/validation/car/query/findAll')
const validationId = require('../../app/validation/car/query/validationId')

router
  .post('/car', validationCreate, CarController.create)
  .get('/car', validationFind, CarController.findAll)
  .delete('/car/:id', validationId, CarController.delete)
  .put('/car/:id', validationId, validationUpdate, CarController.update)
  .get('/car/:id', validationId, carController.getById)
module.exports = router
