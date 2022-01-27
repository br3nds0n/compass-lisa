const router = require('express').Router()

const PersonController = require('../../app/controller/personController')

const validationCreate = require('../../app/validation/person/body/create')

router
  .post('/people', validationCreate, PersonController.create)
  .get('/people', PersonController.findAll)

module.exports = router
