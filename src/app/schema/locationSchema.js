const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const { Schema } = mongoose;

const schema = new Schema({
  id_user: {
    type: Schema.Types.ObjectId,
    ref: 'Clientes',
    required: true
  },
  data_inicio: {
    type: Date,
    required: true
  },
  data_fim: {
    type: Date,
    required: true
  },
  id_carro: {
    type: Schema.Types.ObjectId,
    ref: 'Veiculos',
    required: true
  },
  id_locadora: {
    type: Schema.Types.ObjectId,
    ref: 'Locadoras',
    required: true
  },
  valor_final: {
    type: Number
  }
});

schema.method('toJSON', function () {
  const { ...Location } = this.toObject();

  Location.__v = undefined;

  return Location;
});

schema.plugin(mongoosePaginate);
const Location = mongoose.model('Reservas', schema);

module.exports = Location;
