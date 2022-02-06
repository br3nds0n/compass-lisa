const supertest = require('supertest');
const mongoose = require('mongoose');

const App = require('../../src/app');
const carService = require('../../src/app/service/carService');

const car = {};

describe('Test-Feature-Car', () => {
	beforeAll(async () => {

		car.c1 = await carService.create({
			modelo: 'GM S10 2.8',
			cor: 'branco',
			ano: '2021',
			acessorios: [
				{ descricao: 'Ar-condicionado' },
				{ descricao: 'Dir. Hidráulica' },
			],
			quantidadePassageiros: 5
		});
	});

	afterAll(async () => {
		await mongoose.connection.close();
	});

	it('GET /api/v1/car - find All', async ()=> {
		const res = await supertest(App)
			.get('/api/v1/car');

		expect(res.statusCode).toBe(200);
	});

	it('GET/:id /api/v1/car/:id', async ()=> {
		const res = await supertest(App)
			.get(`/api/v1/car/${car.c1._id}`);

		expect(res.statusCode).toBe(200);
		expect(res.body.modelo).toBe('GM S10 2.8');
	});

	it('POST /api/v1/car', async ()=> {
		const res = await supertest(App)
			.post('/api/v1/car')
			.send({
				modelo: 'Ferrari de Diego',
				cor: 'vermelha',
				ano: '2021',
				acessorios: [
					{ descricao: 'Ar-condicionado' },
					{ descricao: 'Dir. Hidráulica' },
				],
				quantidadePassageiros: 5
			});

		expect(res.statusCode).toBe(201);
	});

	it('PUT /api/v1/car/:id', async ()=>{
		const res = await supertest(App)
			.put(`/api/v1/car/${car.c1._id}`)
			.send({
				modelo: 'ferrari de Giovanni',
				cor: 'preta',
				ano: '2021',
				acessorios: [
					{ descricao: 'Ar-condicionado' },
					{ descricao: 'Dir. Hidráulica' },
				],
				quantidadePassageiros: 5
			});
		expect(res.statusCode).toBe(200);
		expect(res.body.modelo).toBe('ferrari de Giovanni');
	});

	it('DELETE /api/v1/car/:id', async () => {
		const res = await supertest(App)
			.delete(`/api/v1/car/${car.c1._id}`);

		expect(res.statusCode).toBe(204);
	});
});