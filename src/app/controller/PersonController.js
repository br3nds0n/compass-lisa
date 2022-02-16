const PersonService = require('../service/PersonService');

const BadRequest = require('../error/http/BadRequest');
const EntityNotFound = require('../error/EntityNotFound');
const NotFound = require('../error/http/NotFound');
const UniqueEntryError = require('../error/UniqueEntryError');

class PersonController {
  async create(req, res, next) {
    const payload = req.body;
    try {
      const result = await PersonService.create(payload);
      return res.status(201).json(result);
    } catch (error) {
      if (error instanceof UniqueEntryError) {
        next(new BadRequest({ details: error.message }));
      }
    }
  }

  async findAll(req, res, next) {
    const payload = req.query;
    try {
      const result = await PersonService.findAll(payload);
      return res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }

  async delete(req, res, next) {
    const { id } = req.params;
    try {
      await PersonService.delete(id);
      return res.status(204).end();
    } catch (error) {
      if (error instanceof EntityNotFound) {
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
      const result = await PersonService.update(id, newPerson);
      return res.status(200).json(result);
    } catch (error) {
      if (error instanceof EntityNotFound) {
        next(new NotFound(error.message));
      }
      next(error);
    }
  }

  async getById(req, res, next) {
    const { id } = req.params;
    try {
      const result = await PersonService.findById(id);
      return res.status(200).json(result);
    } catch (error) {
      if (error instanceof EntityNotFound) {
        next(new NotFound(error.message));
      }
      next(error);
    }
  }
}

module.exports = new PersonController();
