const mongoose = require('mongoose')
const { Schema } = mongoose

const schema = new Schema({
  modelo: {
    type: String,
    required: true
  },
  cor: {
    type: String,
    required: true
  },
  ano: {
    type: String,
    required: true
  },
  acessorios: {
    type: Array,
    required: true
  },
  quantidadePassageiros: {
    type: Number,
    required: true
  }
})

schema.method('toJSON', function () {
  const { __v, ...car } = this.toObject()

  return car
})

const Car = mongoose.model('Veiculos', schema)

module.exports = Car
