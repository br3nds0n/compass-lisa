const CarService = require('../service/CarService');
const paginate = require('../plugins/carPaginate');

class CarController {
  async create(req, res) {
    const payload = req.body;
    try {
      const result = await CarService.create(payload);
      return res.status(201).json(result);
    } catch (error) {
      return res.status(error.statusCode).json({
        description: error.description,
        name: error.message
      });
    }
  }

  async findAll(req, res) {
    const payload = req.query;
    try {
      const result = await CarService.findAll(payload);
      return res.status(200).json(paginate(result));
    } catch (error) {
      return res.status(error.statusCode).json({
        description: error.description,
        name: error.message
      });
    }
  }

  async delete(req, res) {
    const { id } = req.params;
    try {
      await CarService.delete(id);
      return res.status(204).end();
    } catch (error) {
      return res.status(error.statusCode).json({
        description: error.description,
        name: error.message
      });
    }
  }

  async update(req, res) {
    const { id } = req.params;
    const newCar = req.body;
    try {
      const result = await CarService.update(id, newCar);
      return res.status(200).json(result);
    } catch (error) {
      return res.status(error.statusCode).json({
        description: error.description,
        name: error.message
      });
    }
  }

  async getById(req, res) {
    const { id } = req.params;
    try {
      const result = await CarService.findById(id);
      return res.status(200).json(result);
    } catch (error) {
      return res.status(error.statusCode).json({
        description: error.description,
        name: error.message
      });
    }
  }

  async updateAccessory(req, res) {
    const { id, acessorioId } = req.params;
    const payload = req.body;
    try {
      const result = await CarService.updateAccessory(id, acessorioId, payload);

      return res.status(200).json(result);
    } catch (error) {
      return res.status(error.statusCode).json({
        description: error.description,
        name: error.message
      });
    }
  }
}

module.exports = new CarController();
