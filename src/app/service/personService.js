const PersonRepository = require('../repository/personRepository')

class PersonService {
  async create (person) {
    const result = await PersonRepository.create(person)
    return result
  }
}

module.exports = new PersonService()
