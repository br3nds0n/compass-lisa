const RentalRepository = require('../repository/RentalRepository');
const ViaCep = require('../api/ViaCep');

const NotFound = require('../error/http/NotFound');
const ConflicUtils = require('../helper/utils/ConflicUtils');

class RentalService {
  async create(payload, data) {
    await ConflicUtils.ConflicCnpj(payload.cnpj);

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
