const schema = require('../schema/carSchema');

class CarRepository {
  async create(payload) {
    return schema.create(payload);
  }

  async findAll(payload) {
    const myCustomLabels = {
      totalDocs: 'total',
      docs: 'Veiculos',
      page: 'offset',
      nextPage: false,
      prevPage: false,
      totalPages: 'offsets',
      pagingCounter: false,
      meta: false,
      hasPrevPage: false,
      hasNextPage: false
    };
    const options = {
      page: 1,
      limit: 100,
      customLabels: myCustomLabels
    };
    return schema.paginate(payload, options, {});
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
