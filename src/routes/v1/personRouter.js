const router = require('express').Router()

const PersonController = require('../../app/controller/personController')

const validationCreate = require('../../app/validation/person/body/create')
const validationId = require('../../app/validation/validationId')

router
  .post('/people', validationCreate, PersonController.create)
  .get('/people', PersonController.findAll)
  .delete('/people', validationId, PersonController.delete)

module.exports = router
