const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
const bcrypt = require('bcryptjs');
const ENUM = require('../helper/utils/enum');

const { Schema } = mongoose;

const schema = new Schema({
	nome: {
		type: String,
		required: true
	},
	cpf: {
		type: String,
		minLength:11,
		maxLength: 11,
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
		minLength: 6,
		required: true,
	},
	habilitado: {
		type: String,
		enum: ENUM.habilitado,
		required: true
	}
});

schema.pre('save', async function (next) {
	const hash = await bcrypt.hash(this.senha, 10);
	this.senha = hash;

	next();
});

schema.method('toJSON', function () {
	const { ...person } = this.toObject();

	person.cpf = person.cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
	person.__v = undefined;
	
	return person;
});

schema.plugin(mongoosePaginate);
const Person = mongoose.model('Clientes', schema);

module.exports = Person;
