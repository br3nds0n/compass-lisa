const RentalRepository = require('../repository/RentalRepository');
const ViaCep = require('../api/ViaCep');

const ConflictError = require('../error/ConflictError');
const NotFound = require('../error/http/NotFound');
const BadRequest = require('../error/http/BadRequest');

const ConflicUtils = require('../helper/utils/ConflicUtils');
const validCnpj = require('../helper/functions/isCnpj');

class RentalService {
  async create(payload, data) {
    if (validCnpj(payload.cnpj) === false) {
      throw new BadRequest(`cnpj '${payload.cnpj}' is invalid`);
    }

    await ConflicUtils.ConflicCnpj(payload.cnpj);
    await ConflicUtils.ConflicFilial(payload.endereco);

    try {
      for (let i = 0; i < payload.endereco.length; i++) {
        const ceps = payload.endereco;
        const result = ceps[i];
        const info = await ViaCep.findViaCep(result.cep);
        const { cep, logradouro, complemento, bairro, localidade, uf } = info;
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
        throw new ConflictError(Object.keys(error.keyPattern).map((key) => key));
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

    if (result == null) throw new NotFound(id);

    return result;
  }

  async update(id, payload) {
    const result = await RentalRepository.update(id, payload);

    if (validCnpj(payload.cnpj) === false) {
      throw new BadRequest(`cnpj '${payload.cnpj}' is invalid`);
    }

    if (result == null) throw new NotFound(id);

    return result;
  }

  async findById(id) {
    const result = await RentalRepository.findById(id);

    if (result == null) throw new NotFound(id);

    return result;
  }
}

module.exports = new RentalService();
