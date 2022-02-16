const RentalRepository = require('../repository/RentalRepository');
const ViaCep = require('../api/ViaCep');

const EntityNotFound = require('../error/EntityNotFound');
const UniqueEntryError = require('../error/UniqueEntryError');

class RentalService {
  async create(payload, data) {
    try {
      for (let i = 0; i < payload.endereco.length; i++) {
        const ceps = payload.endereco;
        const result = ceps[i];
        const data = await ViaCep.findViaCep(result.cep);
        const { cep, logradouro, complemento, bairro, localidade, uf } = data;
        result.cep = cep;
        result.logradouro = logradouro;
        result.complemento = complemento;
        result.bairro = bairro;
        result.localidade = localidade;
        result.uf = uf;
      }

      const result = await RentalRepository.create(payload, data);

      return result;
    } catch (error) {
      if (error.name === 'MongoServerError' && error.code === 11000) {
        throw new UniqueEntryError(
          'Locadoras',
          Object.keys(error.keyPattern).map((key) => key)
        );
      } else {
        throw error;
      }
    }
  }

  async findAll(payload) {
    const result = await RentalRepository.findAll(payload);

    return result;
  }

  async delete(id) {
    const result = await RentalRepository.delete(id);

    if (result === null) {
      throw new EntityNotFound(`Cannot find rental with ID = '${id}'`);
    }

    return result;
  }

  async update(id, payload) {
    const result = await RentalRepository.update(id, payload);

    if (result === null) {
      throw new EntityNotFound(`Cannot find rental with ID = '${id}'`);
    }

    return result;
  }

  async findById(id) {
    const result = await RentalRepository.findById(id);

    if (result === null) {
      throw new EntityNotFound(`Cannot find rental with ID = '${id}'`);
    }

    return result;
  }
}

module.exports = new RentalService();
