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
}

module.exports = new PersonService()
