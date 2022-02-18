const Joi = require('joi').extend(require('@joi/date'));

const ENUM = require('../../helper/utils/enum');
const BadRequest = require('../../error/http/BadRequest');

module.exports = async (req, res, next) => {
  try {
    const schema = Joi.object({
      nome: Joi.string().trim().required(),
      cpf: Joi.string().trim().min(11).max(11).required(),
      data_nascimento: Joi.date().format('DD/MM/YYYY').raw().max('now').greater('1-1-1900').required(),
      email: Joi.string()
        .trim()
        .email({
          minDomainSegments: 2,
          tlds: { allow: ENUM.email }
        })
        .required(),
      senha: Joi.string().trim().min(6).required(),
      habilitado: Joi.string()
        .trim()
        .valid(...Object.values(ENUM.habilitado))
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
