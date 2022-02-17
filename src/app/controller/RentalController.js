const RentalService = require('../service/RentalService');
const paginate = require('../plugins/rentalPaginate');

class RentalController {
  async create(req, res) {
    const payload = req.body;
    try {
      const result = await RentalService.create(payload);
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
      const result = await RentalService.findAll(payload);
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
      await RentalService.delete(id);
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
    const newPerson = req.body;
    try {
      const result = await RentalService.update(id, newPerson);
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
      const result = await RentalService.findById(id);
      return res.status(200).json(result);
    } catch (error) {
      return res.status(error.statusCode).json({
        description: error.description,
        name: error.message
      });
    }
  }
}

module.exports = new RentalController();
