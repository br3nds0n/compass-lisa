const CarService = require('../service/carService')

class CarController {
  async create (req, res) {
    try {
      const result = await CarService.create(req.body)
      return res.status(201).json(result)
    } catch (error) {
      return res.status(500).json({ error })
    }
  }

  async findAll (req, res) {
    const payload = req.query
    try {
      const result = await CarService.findAll({
        _id: payload.id,
        modelo: payload.modelo,
        cor: payload.cor,
        ano: payload.ano,
        acessorios: payload.acessorios,
        quantidadePassageiros: payload.quantidadePassageiros,
        limit: payload.limit,
        skip: payload.skip
      })
      return res.status(200).json(result)
    } catch (error) {
      return res.status(500).json({ error })
    }
  }

  async delete (req, res) {
    const { id } = req.params
    try {
      const result = await CarService.delete(id)
      return res.status(204).json(result)
    } catch (error) {
      return res.status(500).json({ error })
    }
  }

  async update (req, res) {
    const { id } = req.params
    const newCar = req.body
    try {
      const result = await CarService.update(id, newCar)
      return res.status(200).json(result)
    } catch (error) {
      return res.status(500).json({ error })
    }
  }

  async getById (req, res) {
    const { id } = req.params
    try {
      const result = await CarService.findById(id)
      return res.status(200).json(result)
    } catch (error) {
      return res.status(500).json({ error })
    }
  }
}

module.exports = new CarController()
