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
		required: true
	},
	atividades: {
		type: String,
		required: true
	},
	endereco: [
		{
			cep: { type: String, required: true },
			number: { type: String, required: true },
			complemento: { type: String, required: false },
			isFilial: { type: Boolean, required: true },
			logadouro: { type: String },
			bairro: { type: String },
			localidade: { type: String }, 
			uf: { type: String },
			_id: false
		}
	]
});

schema.method('toJSON', function () {
	const { ...rental } = this.toObject();

	rental.__v = undefined;

	return rental;
});

schema.plugin(mongoosePaginate);
const Rental = mongoose.model('Locadoras', schema);

module.exports = Rental;