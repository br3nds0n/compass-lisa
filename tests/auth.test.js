const supertest = require('supertest');
const mongoose = require('mongoose');

const App = require('../src/app');
const personService = require('../src/app/service/personService');

const person = {};

describe('Test-Feature-Authenticate', () => {
	beforeAll(async () => {

		person.p1 = await personService.create({
			nome: 'julia',
			cpf: '45571193406',
			data_nascimento:'23/04/2003',
			email:'julia@exemple.com',
			senha: '123456',
			habilitado: 'sim'
		});
	});

	afterAll(async () => {
		await mongoose.connection.dropDatabase();
		await mongoose.connection.close();
	});

	it('POST /api/v1/authenticate', async ()=> {
		const res = await supertest(App)
			.post('/api/v1/authenticate')
			.send({		
				email:'julia@exemple.com',
				senha: '123456',
			});
		expect(res.statusCode).toBe(200);
	});
});