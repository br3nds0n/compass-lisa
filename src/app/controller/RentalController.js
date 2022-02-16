const RentalService = require('../service/RentalService');

const BadRequest = require('../error/http/BadRequest');
const NotFound = require('../error/http/NotFound');
const ConflictError = require('../error/ConflictError');

class RentalController {
  async create(req, res, next) {
    const payload = req.body;
    try {
      const result = await RentalService.create(payload);
      return res.status(201).json(result);
    } catch (error) {
      if (error instanceof ConflictError) {
        next(new BadRequest({ details: error.message }));
      }
      next(error);
    }
  }

  async findAll(req, res, next) {
    const payload = req.query;
    try {
      const result = await RentalService.findAll(payload);
      return res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }

  async delete(req, res, next) {
    const { id } = req.params;
    try {
      await RentalService.delete(id);
      return res.status(204).end();
    } catch (error) {
      if (error instanceof NotFound) {
        next(new NotFound(error.message));
      } else {
        next(error);
      }
    }
  }

  async update(req, res, next) {
    const { id } = req.params;
    const newPerson = req.body;
    try {
      const result = await RentalService.update(id, newPerson);
      return res.status(200).json(result);
    } catch (error) {
      if (error instanceof NotFound) {
        next(new NotFound(error.message));
      }
      next(error);
    }
  }

  async getById(req, res, next) {
    const { id } = req.params;
    try {
      const result = await RentalService.findById(id);
      return res.status(200).json(result);
    } catch (error) {
      if (error instanceof NotFound) {
        next(new NotFound(error.message));
      }
      next(error);
    }
  }
}

module.exports = new RentalController();
