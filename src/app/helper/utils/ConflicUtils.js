const personSchema = require('../../schema/personSchema');
const rentalSchema = require('../../schema/rentalSchema');
const ConflicError = require('../../error/ConflictError');

class ConflicUtils {
  async ConflicCpf(cpf) {
    const getCpf = await personSchema.find({ cpf });

    if (getCpf.length > 0) throw new ConflicError(cpf);
  }

  async ConflicCnpj(cnpj) {
    const getCnpj = await rentalSchema.find({ cnpj });

    if (getCnpj.length > 0) throw new ConflicError(cnpj);
  }
}

module.exports = new ConflicUtils();
