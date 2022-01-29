const schema = require('../schema/carSchema')

class CarRepository {
  async create (car) {
    return schema.create(car)
  }

  async findAll (payload) {
    const myCustomLabels = {
      totalDocs: 'total',
      docs: 'Veiculos',
      page: 'offset',
      nextPage: false,
      prevPage: false,
      totalPages: 'offsets',
      pagingCounter: false,
      meta: false,
      hasPrevPage: false,
      hasNextPage: false
    }
    const options = {
      page: 1,
      limit: 100,
      customLabels: myCustomLabels
    }
    return schema.paginate(payload, options, {})
  }

  async findById (id) {
    return schema.findOne({
      _id: id
    })
  }

  async delete (id) {
    return schema.deleteOne({
      _id: id
    })
  }

  async update (id, payload) {
    return schema.findOneAndUpdate({
      _id: id
    }, payload)
  }
}

module.exports = new CarRepository()
