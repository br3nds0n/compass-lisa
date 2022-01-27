const router = require('express').Router()

const PersonController = require('../../app/controller/personController')

const validationBodyPerson = require('../../app/validation/person/body/validationBodyPerson')
const validationUpdate = require('../../app/validation/person/body/update')
const validationId = require('../../app/validation/validationId')

router
  .post('/people', validationBodyPerson, PersonController.create)
  .get('/people', PersonController.findAll)
  .delete('/people/:id', validationId, PersonController.delete)
  .put('/people/:id', validationId, validationUpdate, PersonController.update)

module.exports = router
