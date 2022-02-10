const RentalService = require('../service/RentalService');
const axios = require('axios');

const BadRequest = require('../error/http/BadRequest');
const EntityNotFound = require('../error/EntityNotFound');
const NotFound = require('../error/http/NotFound');
const UniqueEntryError = require('../error/UniqueEntryError');

class RentalController {
	async create(req, res, next) {
		const payload = req.body;
		try {
			const endereco = payload.endereco.find( element => element !== undefined );
			const  { cep }  = endereco;
			
			const { data } = await axios.get(`https://viacep.com.br/ws/${cep}/json`);
			const { logadouro, bairro, localidade, uf } = data;
			
			Object.assign(endereco, { logadouro: logadouro, bairro: bairro, localidade: localidade, uf: uf });

			const result = await RentalService.create(payload);

			return res.status(201).json(result);
		} catch (error) {
		 if(error instanceof UniqueEntryError){
				next(new BadRequest({ details: error.message }));
		 }
		 next(error);
		}
	}

	async findAll(req, res, next) {
		const payload = req.query;
		try {
			const result = await RentalService.findAll(payload);
			return res.status(200).json(result);
		} catch (error) {
			next(error);
		}
	}

	async delete (req, res, next) {
		const { id } = req.params;
		try {
			await RentalService.delete(id);
			return res.status(204).end();
		} catch (error) {
			if (error instanceof EntityNotFound) {
				next(new NotFound(error.message));
			} else {
				next(error);
			}
		}
	}
}

module.exports = new RentalController();