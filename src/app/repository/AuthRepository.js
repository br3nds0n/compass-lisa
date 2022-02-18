const schema = require('../schema/personSchema');

class AuthRepository {
  async findAuth(email) {
    return schema.findOne({ email });
  }
}
module.exports = new AuthRepository();
