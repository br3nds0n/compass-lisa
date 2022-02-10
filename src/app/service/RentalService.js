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
}

module.exports = new RentalService();