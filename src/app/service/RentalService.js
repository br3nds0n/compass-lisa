const RentalRepository = require('../repository/RentalRepository');

class RentalService {
	async create(payload, data) {
		
		for (let i = 0; i < payload.endereco.length; i += 1) {
			const ceps = payload.endereco;
			const result = ceps[i];
			const data = await RentalRepository.findViaCep(result.cep);
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

	async findAll (payload) {
		const result = await RentalRepository.findAll(payload);

		return result;
	}

	async delete (id) {
		const result = await RentalRepository.delete(id);

		return result;
	}

	async update (id, payload) {
		const result = await RentalRepository.update(id, payload);

		return result;
	}

	async findById (id) {
		const result = await RentalRepository.findById(id);

		return result;
	}
}

module.exports = new RentalService();