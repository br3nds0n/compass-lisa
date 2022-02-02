const schema = require('../schema/personSchema');

class PersonRepository {
	async create (person) {
		return schema.create(person);
	}

	async findAll (payload) {
		const myCustomLabels = {
			totalDocs: 'total',
			docs: 'Pessoas',
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

	async findById (id) {
		return schema.findById(id);
	}

	async delete (id) {
		return schema.findByIdAndDelete(id);
	}

	async update (id, payload) {
		return schema.findByIdAndUpdate(id, payload, { new: true });
	}
}

module.exports = new PersonRepository();
