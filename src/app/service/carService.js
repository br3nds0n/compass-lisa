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

  async findById (id) {
    const result = await CarRepository.findById(id)

    return result
  }

  async delete (id) {
    const result = await this.findById(id)
    await CarRepository.delete(result)

    return result
  }
}

module.exports = new CarService()
