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
    const result = await CarRepository.findAll(payload)
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
    const result = await CarRepository.delete(id)

    return result
  }

  async update (id, payload) {
    const result = await CarRepository.findById(id)
    const updateId = ['modelo', 'cor', 'acessorios', 'quantidadePassageiros']

    updateId.forEach(key => {
      if (payload[key] !== undefined) {
        result[key] = payload[key]
      }
    })

    return result
  }
}

module.exports = new CarService()
