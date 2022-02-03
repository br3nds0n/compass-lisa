const supertest = require('supertest');
const mongoose = require('mongoose');

const App = require('../src/app');

const personService = require('../src/app/service/personService');

describe('Feature tests', () => {
	const route = 'api/v1';
	const entities = {
		person: {}
	};
	let app;

	beforeAll(async () => {
		app = await App;

		entities.person.p1 = await personService.create({
			nome:'Brendson Victor',
			cpf:'71255973439',
			email:'brendson@exemple.com',
			data_nascimento:'23/04/2003',
			senha:'123456',
			habilitado:'sim',
		});

	});

	afterAll(async () => {
		await mongoose.connection.dropDatabase();
		await mongoose.connection.close();
	});

	describe(`GET ${route}/people - Find All`, () => {
		const url = `${route}/people`;

		it('Should return sucess when pass with no paramters', async () => {
			const res = await supertest(app)
				.get(url);

			expect(res.statusCode).toBe(200);
			expect(res.body.total).toBe(1);
		});
	});
});