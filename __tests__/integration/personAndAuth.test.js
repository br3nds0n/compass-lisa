const supertest = require('supertest');
const mongoose = require('mongoose');

const App = require('../database/index');
const personService = require('../../src/app/service/personService');

const person = {};

describe('Test-Feature-Person', () => {
	beforeAll(async () => {

		person.p1 = await personService.create({
			nome: 'gabriel',
			cpf: '81255748993',
			data_nascimento:'23/04/2003',
			email:'gabriel@exemple.com',
			senha: '123456',
			habilitado: 'sim'
		});

		person.p2 = await personService.create({
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

	it('GET /api/v1/people - find All', async ()=> {
		const res = await supertest(App)
			.get('/api/v1/people');

		expect(res.statusCode).toBe(200);
	});

	it('GET/:id /api/v1/people/:id', async ()=> {
		const res = await supertest(App)
			.get(`/api/v1/people/${person.p1._id}`);

		expect(res.statusCode).toBe(200);
		expect(res.body.nome).toBe('gabriel');
	});

	it('POST /api/v1/people', async ()=> {
		const res = await supertest(App)
			.post('/api/v1/people')
			.send({
				nome: 'bredson',
				cpf: '71255973439',
				data_nascimento:'23/04/2003',
				email:'brendson@exemple.com',
				senha: '123456',
				habilitado: 'sim'
			});

		expect(res.statusCode).toBe(201);
	});

	it('PUT /api/v1/people/:id', async ()=>{
		const res = await supertest(App)
			.put(`/api/v1/people/${person.p1._id}`)
			.send({
				nome: 'vinicius',
				cpf: '81255748993',
				data_nascimento:'23/04/2003',
				email:'gabriel@exemple.com',
				senha: '123456',
				habilitado: 'sim'
			});
		expect(res.statusCode).toBe(200);
		expect(res.body.nome).toBe('vinicius');
	});

	it('DELETE /api/v1/people/:id', async () => {
		const res = await supertest(App)
			.delete(`/api/v1/people/${person.p1._id}`);

		expect(res.statusCode).toBe(204);
	});

	/* 
     authenticate
	*/

	describe('Test-Feature-Authenticate', () => {
	
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
});