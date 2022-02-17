const schema = require('../schema/carSchema');

class CarRepository {
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

  async updateAccessory(id, acessorioId, payload) {
    return schema.findByIdAndUpdate(
      id,
      { $set: { 'acessorios.$[outer].descricao': payload.descricao } },
      { arrayFilters: [{ 'outer._id': acessorioId }] }
    );
  }
}
module.exports = new CarRepository();
