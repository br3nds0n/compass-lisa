const schema = require('../schema/locationSchema');

class LocationRepository {
  async create(id, payload) {
    return schema.create(id, payload);
  }
}

module.exports = new LocationRepository();
