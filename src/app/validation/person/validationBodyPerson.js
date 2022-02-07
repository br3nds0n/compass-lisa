const Joi = require('joi').extend(require('@joi/date'));

const isCpf = require('../../helper/functions/isCpf');
const isYear18 = require('../../helper/functions/isYear18');
const ENUM = require('../../helper/utils/enum');

const BadRequest = require('../../error/http/BadRequest');

module.exports = async (req, res, next) => {
	try {
		const schema = Joi.object({
			nome: Joi.string()
				.trim()
				.required(),

			cpf: Joi.string()
				.trim()
				.min(11)
				.max(11)
				.custom((value, help) => {
					if (isCpf(value)) {
						return help.message('Invalid cpf: enter a valid cpf');
					}
					return true;
				}),

			data_nascimento: Joi.date()
				.format('DD/MM/YYYY')
				.raw()
				.max('now')
				.greater('1-1-1900')
				.required()
				.custom((value, help) => {
					if (isYear18(new Date(value)) === false) {
						return help.message('You need tobe ove 18 years old');
					}
				})
				.required(),

			email: Joi.string()
				.trim()
				.email({
					minDomainSegments: 2,
					tlds: { allow: ENUM.email },
				})
				.required(),

			senha: Joi.string()
				.trim()
				.min(6)
				.required(),

			habilitado: Joi.string()
				.trim()
				.valid(...Object.values(ENUM.habilitado))
				.required(),
		});

		const { error } = await schema.validate(req.body, {
			abortEarly: false,
			allowUnknown: false,
		});

		if (error) {
			throw new BadRequest({ details: error.details.map((err) => err.message) });
		}

		next();
	} catch (error) {
		next(error);
	}
};
