const schema = require('../schema/personSchema');

class AuthRepository {
	async findAuth(email){
		return await schema.findOne({ email });
	}
}
module.exports = new AuthRepository(); 