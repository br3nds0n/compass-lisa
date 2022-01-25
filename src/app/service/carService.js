const CarRepository = require('../repository/carRepository')

class CarService {
  async create (car) {
    const result = await CarRepository.create(car)
    return result
  }

  async findAll (payload) {
    const result = await CarRepository.findAll({
      _id: payload.id,
      modelo: payload.modelo,
      cor: payload.cor,
      ano: payload.ano,
      acessorios: payload.acessorios,
      quantidadePassageiros: payload.quantidadePassageiros,
      limit: (payload.limit) ? Number(payload.limit) : 100,
      skip: (payload.skip) ? Number(payload.skip) : undefined
    })
    return result
  }
}

module.exports = new CarService()
