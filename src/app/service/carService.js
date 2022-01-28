const CarRepository = require('../repository/carRepository')

const EntityNotFound = require('../error/errors/EntityNotFound')
const UniqueEntryError = require('../error/errors/UniqueEntryError')

class CarService {
  async create (car) {
    try {
      const result = await CarRepository.create(car)
      return result
    } catch (error) {
      if (error.name === 'ServerError' && error.code === 11000) {
        throw new UniqueEntryError(
          'Veiculos',
          Object.keys(error.keyPattern).map(key => key)
        )
      } else {
        throw error
      }
    }
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

    if (result === null) {
      throw new EntityNotFound(`Cannot find vehicle with ID = '${id}'`)
    }
    return result
  }

  async delete (id) {
    const result = await this.findById(id)
    await CarRepository.delete(result)

    return result
  }

  async update (id, up) {
    const result = await this.findById(id)
    const updateId = ['modelo', 'cor', 'acessorios', 'quantidadePassageiros']

    updateId.forEach(key => {
      if (up[key] !== undefined) {
        result[key] = up[key]
      }
    })

    await CarRepository.update(result)
    return result
  }
}

module.exports = new CarService()
