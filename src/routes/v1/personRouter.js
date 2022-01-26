const router = require('express').Router()

const PersonController = require('../../app/controller/personController')

router
  .post('/peaple', PersonController.create)

module.exports = router
