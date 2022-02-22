const LocationRepository = require('../repository/LocationRepository');

class LocationService {
  async create(payload) {
    const result = await LocationRepository.create(payload);
    return result;
  }
}

module.exports = new LocationService();
