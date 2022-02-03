const schema = require('../schema/personSchema');

class AuthRepository {
	async findAuth(payload){
		return await schema.findOne(payload).select('+senha');
	}
}
module.exports = new AuthRepository(); 