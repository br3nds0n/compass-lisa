const schema = require('../schema/personSchema')

class PersonRepository {
  async create (person) {
    return schema.create(person)
  }
}

module.exports = new PersonRepository()
