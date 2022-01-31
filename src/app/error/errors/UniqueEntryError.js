class UniqueEntryError extends Error {
  constructor (entity, entrys) {
    super('Unique entry error')

    this.name = 'Unique Entry Error'
    this.entrys = entrys.map((entry) => `Data ${entity} already exists with same ${entry}`)
  }
}

module.exports = UniqueEntryError
