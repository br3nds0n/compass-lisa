const RentalService = require('../service/RentalService');
const axios = require('axios');

const BadRequest = require('../error/http/BadRequest');
const UniqueEntryError = require('../error/UniqueEntryError');

class RentalController {
	async create(req, res, next) {
		const { endereco } = req.body;
		try {
			const cep = endereco.map( cep => cep.cep );
			const response = await axios.get(`https://viacep.com.br/ws/${cep}/json`);
			
			console.log(response.data);

			const result = await RentalService.create(req.body);

			return res.status(201).json(result);
		} catch (error) {
		 if(error instanceof UniqueEntryError){
				next(new BadRequest({ details: error.message }));
		 }
		 next(error);
		}
	}
}

module.exports = new RentalController();