const mongoose = require('mongoose')
const { Schema } = mongoose
const bcrypt = require('bcryptjs')

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
    unique: true,
    required: true
  },
  senha: {
    type: String,
    required: true,
    select: false
  },
  habilitado: {
    type: String,
    enum: ['sim', 'não'],
    required: true
  }
})

schema.pre('save', async function (next) {
  const hash = await bcrypt.hash(this.senha, 10)
  this.senha = hash

  next()
})

schema.method('toJSON', function () {
  const { __v, ...person } = this.toObject()

  person.cpf = person.cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4')

  return person
})

const Person = mongoose.model('Clientes', schema)

module.exports = Person
