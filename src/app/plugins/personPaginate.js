const person = ({ _id, nome, cpf, data_nascimento, email, habilitado }) => ({
  _id,
  nome,
  cpf,
  data_nascimento,
  email,
  habilitado
});

const paginate = ({ docs, limit, totalDocs, pagingCounter, totalPages }) => ({
  Pessoas: docs.map(person),
  limit,
  total: totalDocs,
  offset: pagingCounter,
  offsets: totalPages
});

module.exports = paginate;
