const schema = require('../schema/personSchema');

class PersonRepository {
  async create(payload) {
    return schema.create(payload);
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

  async findById(id) {
    return schema.findById(id);
  }

  async delete(id) {
    return schema.findByIdAndDelete(id);
  }

  async update(id, payload) {
    return schema.findByIdAndUpdate(id, payload, { new: true });
  }
}

module.exports = new PersonRepository();
