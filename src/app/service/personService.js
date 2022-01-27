const PersonRepository = require('../repository/personRepository')

class PersonService {
  async create (person) {
    const result = await PersonRepository.create(person)
    return result
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
