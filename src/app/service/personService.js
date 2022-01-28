const PersonRepository = require('../repository/personRepository')

const EntityNotFound = require('../error/errors/EntityNotFound')
const UniqueEntryError = require('../error/errors/UniqueEntryError')

class PersonService {
  async create (person) {
    try {
      const result = await PersonRepository.create(person)
      return result
    } catch (error) {
      if (error.name === 'ServerError' && error.code === 11000) {
        throw new UniqueEntryError(
          'Clientes',
          Object.keys(error.keyPattern).map(key => key)
        )
      } else {
        throw error
      }
    }
  }

  async findAll (payload) {
    const result = await PersonRepository.findAll({
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
    return result
  }

  async findById (id) {
    const result = await PersonRepository.findById(id)

    if (result === null) {
      throw new EntityNotFound(`Cannot find customer with ID = '${id}'`)
    }
    return result
  }

  async delete (id) {
    const result = await this.findById(id)
    await PersonRepository.delete(result)

    return result
  }

  async update (id, up) {
    const result = await this.findById(id)
    const updateId = ['nome', 'cpf', 'data_nascimento', 'email', 'habilitado']

    updateId.forEach(key => {
      if (up[key] !== undefined) {
        result[key] = up[key]
      }
    })

    await PersonRepository.update(result)
    return result
  }
}

module.exports = new PersonService()
