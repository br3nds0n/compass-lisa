const LocationService = require('../service/LocationService');

class LocationController {
  async create(req, res) {
    try {
      const { id } = req.params;
      const result = await LocationService.create(id, req.body);
      return res.status(201).json(result);
    } catch (error) {
      return res.status(400).json({ description: error.description, name: error.message });
    }
  }
}

module.exports = new LocationController();
