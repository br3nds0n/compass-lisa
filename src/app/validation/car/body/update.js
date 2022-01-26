const Joi = require('joi').extend(require('@joi/date'))

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
        .items(
          Joi.object()
            .required())
        .unique()
        .required(),

      quantidadePassageiros: Joi.number()
        .integer()
        .required()
    })

    const { error } = await schema.validate(req.body, { abortEarl: true })
    if (error) throw error
    return next()
  } catch (error) {
    return res.status(400).json(error)
  }
}
