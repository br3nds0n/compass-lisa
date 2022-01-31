const router = require('express').Router()
const AuthenticateController = require('../../app/controller/authentication/AuthenticateController')

router
  .post('/authenticate', AuthenticateController.authenticate)

module.exports = router
