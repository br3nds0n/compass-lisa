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

const Car = mongoose.model('Veiculos', schema)

module.exports = Car
