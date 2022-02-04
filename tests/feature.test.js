const supertest = require('supertest');

const App = require('../src/app');

describe('test-Feature', () => {
	it('GET /api/v1/people - find All', async ()=>{
		const res = await supertest(App).get('/api/v1/people');

		expect(res.statusCode).toBe(200);
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
});