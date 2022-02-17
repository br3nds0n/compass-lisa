const PersonRepository = require('../repository/PersonRepository');

const ConflictError = require('../error/ConflictError');
const NotFound = require('../error/http/NotFound');
const BadRequest = require('../error/http/BadRequest');

const ConflicUtils = require('../helper/utils/ConflicUtils');
const validCpf = require('../helper/functions/isCpf');

class PersonService {
  async create(payload) {
    if (validCpf(payload.cpf) === false) {
      throw new BadRequest(`cpf '${payload.cpf}' is invalid`);
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

    return result;
  }
}

module.exports = new PersonService();
