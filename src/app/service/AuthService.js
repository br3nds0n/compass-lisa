const bcrypt = require('bcryptjs');

const AuthRepository = require('../repository/AuthRepository.js');
const generateToken = require('../helper/functions/generateToken');
const NotFound = require('../error/http/NotFound.js');

class AuthService {
  async findAuth(payload) {
    const { senha } = payload;
    const user = await AuthRepository.findAuth(payload.email);

    if (!user) throw new NotFound('email');

    if (!(await bcrypt.compare(senha, user.senha)));

    const { email, habilitado } = user;
    const token = generateToken({ id: user.id });

    const response = { email, habilitado, token };
    return response;
  }
}

module.exports = new AuthService();
