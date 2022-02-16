class EntityNotFound extends Error {
  constructor(message) {
    super(message);

    this.name = 'Data not found';
  }
}

module.exports = EntityNotFound;
