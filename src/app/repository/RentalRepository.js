const schema = require('../schema/rentalSchema');

class RentalRepository {
	async create(payload, data) {
		return await schema.create(payload, data);
	}

	async findAll (payload) {
		const myCustomLabels = {
			totalDocs: 'total',
			docs: 'Veiculos',
			page: 'offset',
			nextPage: false,
			prevPage: false,
			totalPages: 'offsets',
			pagingCounter: false,
			meta: false,
			hasPrevPage: false,
			hasNextPage: false
		};
		const options = {
			page: 1,
			limit: 100,
			customLabels: myCustomLabels
		};
		return schema.paginate(payload, options, {});
	}
}

module.exports = new RentalRepository();