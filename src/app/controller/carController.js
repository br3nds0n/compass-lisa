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
}

module.exports = new CarController()
