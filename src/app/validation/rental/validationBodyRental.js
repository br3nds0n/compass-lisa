const Joi = require('joi');

const isCnpj = require('../../helper/functions/isCnpj');

const BadRequest = require('../../error/http/BadRequest');

module.exports = async (req, res, next) => {
	try {
		const schema = Joi.object({
			nome: Joi.string()
				.trim()
				.required(),

			cnpj: Joi.string()
				.trim()
				.min(14)
				.max(14)
	      .custom((value, help) => {
					if (!isCnpj(value)) {
						return help.message('Invalid cnpj: enter a valid cnpj');
					}
					return true;
				}),

			atividades: Joi.string()
				.trim()
				.required(),

			endereco: Joi.array()
				.min(1)
				.unique('cep')
				.items(
					Joi.object({
						cep: Joi.string().min(8).max(8).trim().required(),
						number: Joi.string().trim().required(),
						complemento: Joi.string().trim(),
						isFilial: Joi.boolean().required()
					}))
		});

		const { error } = await schema.validate(req.body, {
			abortEarly: false,
			allowUnknown: false,
		});

		if (error) {
			throw new BadRequest({ details: error.details.map((detail) => ({
				name: detail.path[0],
				description: detail.message
			})) });
		}

		next();
	} catch (error) {
		next(error);
	}
};