const Joi = require('joi').extend(require('@joi/date'));

const BadRequest = require('../../error/http/BadRequest');

module.exports = async (req, res, next) => {
	try {
		const schema = Joi.object({
			descricao: Joi.string()
				.trim()
				.required()
		});

		const { error } = await schema.validate(req.body, {
			abortEarly: false,
			allowUnknown: false
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
