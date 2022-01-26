const router = require('express').Router()
const AuthenticateController = require('../../app/validation/authentication/authenticateController')
router
  .post('/authenticate', AuthenticateController.authenticate)

module.exports = router
