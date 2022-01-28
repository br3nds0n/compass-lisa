const PersonService = require('../service/personService')

const BadRequest = require('../error/errors/BadRequest')
const EntityNotFound = require('../error/errors/EntityNotFound')
const NotFound = require('../error/errors/NotFound')
const UniqueEntryError = require('../error/errors/UniqueEntryError')

class PersonController {
  async create (req, res, next) {
    try {
      const result = await PersonService.create(req.body)
      return res.status(201).json(result)
    } catch (error) {
      if (error instanceof UniqueEntryError) {
        next(new BadRequest({ details: error.message }))
      }
    }
  }

  async findAll (req, res, next) {
    const payload = req.query
    try {
      const result = await PersonService.findAll({
        _id: payload.id,
        nome: payload.nome,
        cpf: payload.cpf,
        data_nascimento: payload.data_nascimento,
        email: payload.email,
        senha: payload.senha,
        habilitado: payload.habilitado,
        limit: (payload.limit) ? Number(payload.limit) : 100,
        skip: (payload.skip) ? Number(payload.skip) : undefined
      })
      return res.status(200).json(result)
    } catch (error) {
      next(error)
    }
  }

  async delete (req, res, next) {
    const { id } = req.params
    try {
      const result = await PersonService.delete(id)
      return res.status(204).json(result)
    } catch (error) {
      if (error instanceof EntityNotFound) {
        next(new NotFound(error.message))
      } else {
        next(error)
      }
    }
  }

  async update (req, res, next) {
    const { id } = req.params
    const newPerson = req.body
    try {
      const result = await PersonService.update(id, newPerson)
      return res.status(200).json(result)
    } catch (error) {
      if (error instanceof EntityNotFound) {
        next(new NotFound(error.message))
      }
      next(error)
    }
  }

  async getById (req, res, next) {
    const { id } = req.params
    try {
      const result = await PersonService.findById(id)
      return res.status(200).json(result)
    } catch (error) {
      if (error instanceof EntityNotFound) {
        next(new NotFound(error.message))
      }
      next(error)
    }
  }
}

module.exports = new PersonController()
