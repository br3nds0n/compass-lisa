const Joi = require('joi').extend(require('@joi/date'));

const BadRequest = require('../error/errors/BadRequest');

module.exports = async (req, res, next) => {
	try {
		const schema = Joi.object({
			id: Joi.string()
				.min(24)
				.max(24)
		});

		const { error } = await schema.validate(req.query, { abortEarl: true });
		if (error) throw error;

		if (error) {
			throw new BadRequest({ details: error.details.map((err) => err.message) });
		}

		next();
	} catch (error) {
		next(error);
	}
};
