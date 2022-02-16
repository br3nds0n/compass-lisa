const Joi = require('joi');

const BadRequest = require('../error/http/BadRequest');

module.exports = async (req, res, next) => {
  try {
    const schema = Joi.object({
      id: Joi.string()
        .pattern(/^[0-9a-fA-F]{24}$/)
        .min(24)
        .max(24)
        .required()
    });

    const { error } = await schema.validate(req.params, { abortEarly: false });
    if (error) throw error;

    if (error) {
      throw new BadRequest({
        details: error.details.map((detail) => ({
          name: detail.path[0],
          description: detail.message
        }))
      });
    }

    next();
  } catch (error) {
    next(error);
  }
};
