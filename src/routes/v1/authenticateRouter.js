const router = require('express').Router();
const AuthenticateController = require('../../app/controller/authentication/AuthenticateController');

const authenticateValidationBody = require('../../app/validation/authentication/authenticaionValidatebody');

router
	.post('/authenticate', authenticateValidationBody, AuthenticateController.authenticate);

module.exports = router;
