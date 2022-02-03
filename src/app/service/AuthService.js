const AuthRepository = require('../repository/AuthRepository.js');

class AuthService{  
	async findAuth(payload){
		return await AuthRepository.findAuth(payload);
	}
}

module.exports = new AuthService();