class UniqueEntryError extends Error {
	constructor (entity, entrys) {
		super('Unique entry error');

		this.name = 'Unique Entry Error';
		this.body = `the '${entrys}' field is already registere`;
	}
}

module.exports = UniqueEntryError;
