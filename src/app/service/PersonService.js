const PersonRepository = require('../repository/PersonRepository');

const NotFound = require('../error/http/NotFound');

const DuplicateDataUtils = require('../helper/utils/DuplicateDataUtils');

class PersonService {
  async create(payload) {
    await DuplicateDataUtils.duplicatedCpf(payload.cpf);

    const result = await PersonRepository.create(payload);
    return result;
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
