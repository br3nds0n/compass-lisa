const CarRepository = require('../repository/carRepository')

class CarService {
  async create (car) {
    const result = await CarRepository.create(car)
    return result
  }
}

module.exports = new CarService()
