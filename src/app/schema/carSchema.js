const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const { Schema } = mongoose;

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
		minLength: 1,
		required: true
	}
});

schema.method('toJSON', function () {
	const { ...car } = this.toObject();

	 car.__v = undefined;

	return car;
});

schema.plugin(mongoosePaginate);
const Car = mongoose.model('Veiculos', schema);

module.exports = Car;
