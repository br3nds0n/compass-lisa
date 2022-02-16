const PersonRepository = require('../repository/PersonRepository');

const EntityNotFound = require('../error/EntityNotFound');
const UniqueEntryError = require('../error/UniqueEntryError');

class PersonService {
  async create(payload) {
    try {
      const result = await PersonRepository.create(payload);
      return result;
    } catch (error) {
      if (error.name === 'MongoServerError' && error.code === 11000) {
        throw new UniqueEntryError(
          'Clientes',
          Object.keys(error.keyPattern).map((key) => key)
        );
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

    if (result === null) {
      throw new EntityNotFound(`Cannot find customer with ID = '${id}'`);
    }
    return result;
  }

  async delete(id) {
    const result = await PersonRepository.delete(id);

    if (result === null) {
      throw new EntityNotFound(`Cannot find customer with ID = '${id}'`);
    }

    return result;
  }

  async update(id, payload) {
    const result = await PersonRepository.update(id, payload);

    if (result === null) {
      throw new EntityNotFound(`Cannot find customer with ID = '${id}'`);
    }

    return result;
  }
}

module.exports = new PersonService();
