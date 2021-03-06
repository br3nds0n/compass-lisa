const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const { Schema } = mongoose;

const schema = new Schema({
  nome: {
    type: String,
    required: true
  },
  cnpj: {
    type: String,
    unique: true,
    minLength: 14,
    maxLength: 14,
    required: true
  },
  atividades: {
    type: String,
    required: true
  },
  endereco: [
    {
      cep: { type: String, unique: true, required: true },
      number: { type: String, required: true },
      complemento: { type: String, required: false },
      isFilial: { type: Boolean, required: true },
      logradouro: { type: String, required: false },
      bairro: { type: String, required: false },
      localidade: { type: String, required: false },
      uf: { type: String, required: false },
      _id: false
    }
  ]
});

schema.method('toJSON', function () {
  const { ...rental } = this.toObject();

  rental.cnpj = rental.cnpj.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5');
  rental.__v = undefined;

  return rental;
});

schema.plugin(mongoosePaginate);
const Rental = mongoose.model('Locadoras', schema);

module.exports = Rental;
