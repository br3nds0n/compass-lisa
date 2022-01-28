const Joi = require('joi').extend(require('@joi/date'))
const BadRequest = require('../../../error/errors/BadRequest')

module.exports = async (req, res, next) => {
  try {
    const schema = Joi.object({
      modelo: Joi.string()
        .required(),

      cor: Joi.string()
        .required(),

      ano: Joi.date()
        .format('YYYY')
        .min('1950-01-01')
        .max('2022-12-31')
        .required(),

      acessorios: Joi.array()
        .min(1)
        .items(
          Joi.object({
            descricao: Joi.string()
              .required()
          }))
        .required(),

      quantidadePassageiros: Joi.number()
        .integer()
        .required()
    })

    const { error } = await schema.validate(req.body, { abortEarl: true })

    if (error) {
      throw new BadRequest({ details: error.details.map(err => err.message) })
    }

    next()
  } catch (error) {
    next(error)
  }
}
