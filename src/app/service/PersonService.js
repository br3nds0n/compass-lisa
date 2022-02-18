const PersonRepository = require('../repository/PersonRepository');

const ConflictError = require('../error/ConflictError');
const NotFound = require('../error/http/NotFound');
const BadRequest = require('../error/http/BadRequest');

const ConflicUtils = require('../helper/utils/ConflicUtils');
const validCpf = require('../helper/functions/isCpf');
const isYear18 = require('../helper/functions/isYear18');

class PersonService {
  async create(payload) {
    if (validCpf(payload.cpf) === false) {
      throw new BadRequest(`cpf '${payload.cpf}' is invalid`);
    }

    const getDate = payload.data_nascimento;
    const date = getDate.substr(6, 4);
    if (isYear18(new Date(date)) === false) {
      throw new BadRequest('must be over 18 years old');
    }

    await ConflicUtils.ConflicCpf(payload.cpf);
    await ConflicUtils.ConflicEmail(payload.email);

    try {
      const result = await PersonRepository.create(payload);
      return result;
    } catch (error) {
      if (error.name === 'MongoServerError' && error.code === 11000) {
        throw new ConflictError(Object.keys(error.keyPattern).map((key) => key));
      } else {
        throw error;
      }
    }
  }

  async findAll(payload) {
    const result = await PersonRepository.findAll(payload);

    return result;
  }

  async findById(id) {
    const result = await PersonRepository.findById(id);

    if (result == null) throw new NotFound(id);

    return result;
  }

  async delete(id) {
    const result = await PersonRepository.delete(id);

    if (result == null) throw new NotFound(id);

    return result;
  }

  async update(id, payload) {
    const result = await PersonRepository.update(id, payload);
    if (result == null) throw new NotFound(id);

    if (validCpf(payload.cpf) === false) {
      throw new BadRequest(`cpf '${payload.cpf}' is invalid`);
    }

    const getDate = payload.data_nascimento;
    const date = getDate.substr(6, 4);
    if (isYear18(new Date(date)) === false) {
      throw new BadRequest('must be over 18 years old');
    }

    return result;
  }
}

module.exports = new PersonService();
