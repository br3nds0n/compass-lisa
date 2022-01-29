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
    const result = await PersonRepository.findAll(payload)

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
    const result = await PersonRepository.delete(id)

    return result
  }

  async update (id, payload) {
    const result = await PersonRepository.update(id)
    const updateId = ['nome', 'cpf', 'data_nascimento', 'email', 'habilitado']

    updateId.forEach(key => {
      if (payload[key] !== undefined) {
        result[key] = payload[key]
      }
    })

    return result
  }
}

module.exports = new PersonService()
