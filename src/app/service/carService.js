const CarRepository = require('../repository/CarRepository');

const EntityNotFound = require('../error/errors/EntityNotFound');
const UniqueEntryError = require('../error/errors/UniqueEntryError');

class CarService {
	async create (car) {
		try {
			const result = await CarRepository.create(car);
			return result;
		} catch (error) {
			if (error.name === 'MongoServerError' && error.code === 11000) {
				throw new UniqueEntryError(
					'Veiculos',
					Object.keys(error.keyPattern).map((key) => key)
				);
			} else {
				throw error;
			}
		}
	}

	async findAll (payload) {
		const result = await CarRepository.findAll(payload);
		return result;
	}

	async findById (id) {
		const result = await CarRepository.findById(id);

		if (result === null) {
			throw new EntityNotFound(`Cannot find vehicle with ID = '${id}'`);
		}
		return result;
	}

	async delete (id) {
		const result = await CarRepository.delete(id);
		
		if (result === null) {
			throw new EntityNotFound(`Cannot find vehicle with ID = '${id}'`);
		}
		return result;
	}

	async update (id, payload) {
		const result = await CarRepository.update(id, payload);

		return result;
	}
}

module.exports = new CarService();
