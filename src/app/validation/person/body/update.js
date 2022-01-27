const Joi = require('joi').extend(require('@joi/date'))
const isCpf = require('../../../helper/isCpf')

module.exports = async (req, res, next) => {
  try {
    const schema = Joi.object({
      nome: Joi.string()
        .required(),

      cpf: Joi.string()
        .min(11)
        .max(11)
        .custom((value, help) => {
          if (isCpf(value)) {
            return help.message('Invalid cpf: enter a valid cpf')
          } else {
            return true
          }
        }),

      data_nascimento: Joi.date()
        .format('DD/MM/YYYY')
        .less('2004-01-01')
        .max('now')
        .required(),

      email: Joi.string()
        .email()
        .required(),

      senha: Joi.string()
        .min(6),

      habilitado: Joi.string()
        .required()
    })

    const { error } = await schema.validate(req.body, { abortEarl: true })
    if (error) throw error
    return next()
  } catch (error) {
    return res.status(400).json(error)
  }
}
