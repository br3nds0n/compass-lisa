const Joi = require('joi').extend(require('@joi/date'))

module.exports = async (req, res, next) => {
  try {
    const schema = Joi.object({
      modelo: Joi.string(),

      cor: Joi.string(),

      ano: Joi.date()
        .format('YYYY')
        .min('1950-01-01')
        .max('2022-12-31'),

      acessorios: Joi.array()
        .items(
          Joi.object()
            .required())
        .unique(),

      quantidadePassageiros: Joi.number()
        .integer(),

      limit: Joi.number()
        .min(1),
      skip: Joi.number()
        .min(0)
    })

    const { error } = await schema.validate(req.query, { abortEarl: true })
    if (error) throw error
    return next()
  } catch (error) {
    return res.status(400).json(error)
  }
}
