const schema = require('../schema/personSchema')
const clearObject = require('../helper/clearObject')

class PersonRepository {
  async create (person) {
    return schema.create(person)
  }

  async findAll ({ limit = 0, skip = 0, ...payload }) {
    clearObject(payload)

    const filter = {
      $and: [{ ...payload }
      ]
    }

    const count = await schema.count(filter)
      .exec()

    const car = await schema.find(filter)
      .limit(limit)
      .skip((skip === 0) ? skip : skip + 1)
      .exec()

    return new Promise((resolve, reject) => {
      resolve({
        Pessoas: car,
        total: count,
        limit: (limit === 0) ? count : limit,
        offset: skip + 1,
        offsets: (limit === 0) ? 1 : Math.ceil(count / limit)
      })
    })
  }

  async findById (id) {
    return schema.findOne({
      _id: id
    })
  }

  async delete (id) {
    return schema.deleteOne(id)
  }
}

module.exports = new PersonRepository()
