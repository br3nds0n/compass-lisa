const jwt = require('jsonwebtoken');
const authConfig = require('../../config/authenticate.json');

function generateToken (email, habilitado = {}) {
	return jwt.sign({ email, habilitado }, authConfig.secret, {
		expiresIn: 86400
	});
}

module.exports = generateToken;
