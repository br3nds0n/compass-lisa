const personSchema = require('../../schema/personSchema');
const ConflicError = require('../../error/ConflictError');

class DuplicateDataUtils {
  async duplicatedCpf(cpf) {
    const cpfSeach = await personSchema.find({ cpf });

    if (cpfSeach.length > 0) throw new ConflicError(cpf);
  }
}

module.exports = new DuplicateDataUtils();
