const schema = require('../schema/rentalSchema');

class RentalRepository {
  async create(payload, data) {
    return schema.create(payload, data);
  }

  async findAll(payload) {
    const { page = 1, limit = 100, ...query } = payload;
    return schema.paginate(
      { ...query },
      {
        limit: Number(limit),
        page: Number(page),
        skip: (Number(page) - 1) * Number(limit)
      }
    );
  }

  async delete(id) {
    return schema.findByIdAndDelete(id);
  }

  async update(id, payload) {
    return schema.findByIdAndUpdate(id, payload, { new: true });
  }

  async findById(id) {
    return schema.findById(id);
  }
}

module.exports = new RentalRepository();
