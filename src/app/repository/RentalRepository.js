const schema = require('../schema/rentalSchema');

class RentalRepository {
	async create(payload) {
		return await schema.create(payload);
	}
}

module.exports = new RentalRepository();