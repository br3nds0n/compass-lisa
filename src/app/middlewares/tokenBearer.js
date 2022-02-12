const jwt = require('jsonwebtoken');
const auth = require('../config/authenticate.json');

module.exports = (req, res, next) => {
	try {
		const authReader = req.headers.authorization;
		if (!authReader) return res.status(401).send({ name: 'Token', message: 'Token not provided.' });

		const parts = authReader.split(' ');
		if (parts.length !== 2) return res.status(401).send({ name: 'Token', message: 'Token malformated.' });

		const [token] = parts;
		jwt.verify(token, auth.secret);
		return next();
	} catch (error) {
		return res.status(401).json(
			error.details.map((detail) => ({
				name: detail.path[0],
				description: detail.message
			}))
		);
	}
};
