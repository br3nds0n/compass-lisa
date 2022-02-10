const RentalRepository = require('../repository/RentalRepository');

class RentalService {
	async create(payload, data) {
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
}

module.exports = new RentalService();