const Joi = require('joi').extend(require('@joi/date'));

const BadRequest = require('../../error/http/BadRequest');

module.exports = async (req, res, next) => {
  try {
    const schema = Joi.object({
      nome: Joi.string().trim(),
      cnpj: Joi.string().trim().min(14).max(14),
      atividades: Joi.string().trim(),
      endereco: Joi.array()
        .min(1)
        .unique('cep')
        .items(
          Joi.object({
            cep: Joi.string().min(8).max(8).trim(),
            number: Joi.string().trim(),
            complemento: Joi.string().trim(),
            isFilial: Joi.boolean()
          })
        )
    });

    const { error } = await schema.validate(req.query, { abortEarly: true });

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
