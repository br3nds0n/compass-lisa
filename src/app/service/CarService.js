const CarRepository = require('../repository/CarRepository');

const NotFound = require('../error/http/NotFound');
const ConflictError = require('../error/ConflictError');

class CarService {
  async create(payload) {
    try {
      const result = await CarRepository.create(payload);
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
    const result = await CarRepository.findAll(payload);
    return result;
  }

  async findById(id) {
    const result = await CarRepository.findById(id);

    if (result == null) throw new NotFound(id);

    return result;
  }

  async delete(id) {
    const result = await CarRepository.delete(id);

    if (result == null) throw new NotFound(id);

    return result;
  }

  async update(id, payload) {
    const result = await CarRepository.update(id, payload);

    if (result == null) throw new NotFound(id);

    return result;
  }

  async updateAccessory(id, acessorioId, payload) {
    const result = await CarRepository.updateAccessory(id, acessorioId, payload);

    return result;
  }
}

module.exports = new CarService();
