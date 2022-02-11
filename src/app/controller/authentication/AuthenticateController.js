const bcrypt = require('bcryptjs');

const AuthService = require('../../service/AuthService');
const generateToken = require('../../helper/functions/generateToken');

const NotFound = require('../../error/http/NotFound');

class AuthenticateController {
	 async authenticate(req, res, next) {
		const { email, senha } = req.body;
		try {
			const user = await AuthService.findAuth({email});

			if (!user) {
				throw new NotFound;
			}

			if (!await bcrypt.compare(senha, user.senha)) {
				return res.status(400).json({ 
					message: 'Bad Request',
					details: [ 'Invalid password'] 
				});
			}

			user.senha = undefined;

		 res.send({
				user,
				token: generateToken({ id: user.id }),
			});
		
		} catch (error) {
			next(error);
		}
	}
}

module.exports = new AuthenticateController();
