const CarService = require('../service/CarService');

const BadRequest = require('../error/errors/BadRequest');
const EntityNotFound = require('../error/errors/EntityNotFound');
const NotFound = require('../error/errors/NotFound');
const UniqueEntryError = require('../error/errors/UniqueEntryError');

class CarController {
	async create(req, res, next) {
		try {
			const result = await CarService.create(req.body);
			return res.status(201).json(result);
		} catch (error) {
			if (error instanceof UniqueEntryError) {
				next(new BadRequest({ details: error.message }));
			}
			next(error);
		
		}
	}

	async findAll(req, res, next) {
		const payload = req.query;
		try {
			const result = await CarService.findAll(payload);
			return res.status(200).json(result);
		} catch (error) {
			next(error);
		}
	}

	async delete(req, res, next) {
		const { id } = req.params;
		try {
			await CarService.delete(id);
			return res.status(204).end();
		} catch (error) {
			if (error instanceof EntityNotFound) {
				next(new NotFound(error.message));
			} else {
				next(error);
			}
		}
	}

	async update(req, res, next) {
		const { id } = req.params;
		const newCar = req.body;
		try {
			const result = await CarService.update(id, newCar);
			return res.status(200).json(result);
		} catch (error) {
			if (error instanceof EntityNotFound) {
				next(new NotFound(error.message));
			}
			next(error);
		}
	}

	async getById(req, res, next) {
		const { id } = req.params;
		try {
			const result = await CarService.findById(id);
			return res.status(200).json(result);
		} catch (error) {
			if (error instanceof EntityNotFound) {
				next(new NotFound(error.message));
			}
			next(error);
		}
	}
}

module.exports = new CarController();
