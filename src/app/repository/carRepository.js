const schema = require('../schema/carSchema')

class CarRepository {
  async create (car) {
    return schema.create(car)
  }
}

module.exports = new CarRepository()
