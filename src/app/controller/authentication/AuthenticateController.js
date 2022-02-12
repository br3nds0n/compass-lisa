const AuthService = require('../../service/AuthService');

class AuthenticateController {
	 async authenticate(req, res, next) {
		 const payload = req.body;
		try {
			const result = await AuthService.findAuth(payload);
			return res.status(200).json(result);
		} catch (error) {
			next(error);
		}
	}
}

module.exports = new AuthenticateController();
