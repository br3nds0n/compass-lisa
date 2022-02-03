const Joi = require('joi').extend(require('@joi/date'));
const ENUM = require('../../helper/enum');

const BadRequest = require('../../error/errors/BadRequest');

module.exports = async (req, res, next) => {
	try {
		const schema = Joi.object({
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