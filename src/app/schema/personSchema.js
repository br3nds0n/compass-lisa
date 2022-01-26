const mongoose = require('mongoose')
const { Schema } = mongoose

const schema = new Schema({
  nome: {
    type: String,
    required: true
  },
  cpf: {
    type: String,
    unique: true,
    required: true
  },
  data_nascimento: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  senha: {
    type: String,
    required: true
  },
  habilitado: {
    type: String,
    enum: ['sim', 'não'],
    required: true
  }
})

schema.method('toJSON', function () {
  const { __v, ...person } = this.toObject()

  person.cpf = person.cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4')

  return person
})

const Person = mongoose.model('Clientes', schema)

module.exports = Person
