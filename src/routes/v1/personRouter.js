const router = require('express').Router()

const PersonController = require('../../app/controller/personController')

const validationCreate = require('../../app/validation/person/body/create')

router
  .post('/peaple', validationCreate, PersonController.create)

module.exports = router
