const Joi = require('joi').extend(require('@joi/date'));

const BadRequest = require('../../error/http/BadRequest');

module.exports = async (req, res, next) => {
  try {
    const schema = Joi.object({
      id_user: Joi.string()
        .pattern(/^[0-9a-fA-F]{24}$/)
        .required(),
      data_inicio: Joi.date().format('DD/MM/YYYY').required(),
      data_fim: Joi.date().format('DD/MM/YYYY').required(),
      id_carro: Joi.string()
        .regex.pattern(/^[0-9a-fA-F]{24}$/)
        .required(),
      id_locadora: Joi.string()
        .pattern(/^[0-9a-fA-F]{24}$/)
        .required()
    });

    const { error } = await schema.validate(req.body, {
      abortEarly: false,
      allowUnknown: false
    });

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
