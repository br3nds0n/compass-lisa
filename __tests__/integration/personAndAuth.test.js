const supertest = require('supertest');
const mongoose = require('mongoose');

const App = require('../database/index');
const PersonService = require('../../src/app/service/PersonService');

const person = {};

describe('Test-Feature-Person', () => {
  beforeAll(async () => {
    person.p1 = await PersonService.create({
      nome: 'gabriel',
      cpf: '92860405046',
      data_nascimento: '23/04/2003',
      email: 'gabriel@exemple.com',
      senha: '123456',
      habilitado: 'sim'
    });

    person.p2 = await PersonService.create({
      nome: 'julia',
      cpf: '05474941064',
      data_nascimento: '23/04/2003',
      email: 'julia@exemple.com',
      senha: '123456',
      habilitado: 'sim'
    });
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  /* 
    GET - PEOPLE
  */

  it('GET /api/v1/people - find All', async () => {
    const res = await supertest(App).get('/api/v1/people');

    expect(res.statusCode).toBe(200);
  });

  it('GET /api/v1/people - find All', async () => {
    const res = await supertest(App).get('/api/v1/people?data_nascimento=1');

    expect(res.statusCode).toBe(400);
  });

  it('GET /api/v1/people - find All', async () => {
    const res = await supertest(App).get('/api/v1/people?cpf=1231');

    expect(res.statusCode).toBe(400);
  });

  it('GET /api/v1/people - find All', async () => {
    const res = await supertest(App).get('/api/v1/people?email=1231');

    expect(res.statusCode).toBe(400);
  });

  it('GET /api/v1/people - INVALID', async () => {
    const res = await supertest(App).get('/api/v1/peop');

    expect(res.statusCode).toBe(404);
  });

  /* 
    GET/:id - PEOPLE
  */

  it('GET/:id /api/v1/people/:id', async () => {
    const res = await supertest(App).get(`/api/v1/people/${person.p1._id}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.nome).toBe('gabriel');
  });

  it('GET/:id /api/v1/people/:id - INVALID', async () => {
    const res = await supertest(App).get(`/api/v1/people/620ebf227ce3f1fc44f00920`);

    expect(res.statusCode).toBe(404);
  });

  /* 
    POST - PEOPLE
  */

  it('POST /api/v1/people', async () => {
    const res = await supertest(App).post('/api/v1/people').send({
      nome: 'bredson',
      cpf: '57042360060',
      data_nascimento: '23/04/2003',
      email: 'brendson@exemple.com',
      senha: '123456',
      habilitado: 'sim'
    });

    expect(res.statusCode).toBe(201);
  });

  it('POST /api/v1/people - INVALID', async () => {
    const res = await supertest(App).post('/api/v1/people').send({
      nome: '',
      cpf: '',
      data_nascimento: '',
      email: '',
      senha: '',
      habilitado: ''
    });

    expect(res.statusCode).toBe(400);
  });

  it('POST /api/v1/people INVALID CONFLCT CPF', async () => {
    const res = await supertest(App).post('/api/v1/people').send({
      nome: 'bredson',
      cpf: '57042360060',
      data_nascimento: '23/04/2003',
      email: 'brendson@exemple.com',
      senha: '123456',
      habilitado: 'sim'
    });

    expect(res.statusCode).toBe(409);
  });

  it('POST /api/v1/people INVALID CONFLCT EMAIL', async () => {
    const res = await supertest(App).post('/api/v1/people').send({
      nome: 'bredson',
      cpf: '70241981093',
      data_nascimento: '23/04/2003',
      email: 'brendson@exemple.com',
      senha: '123456',
      habilitado: 'sim'
    });

    expect(res.statusCode).toBe(409);
  });

  /* 
    PUT - PEOPLE
  */

  it('PUT /api/v1/people/:id ', async () => {
    const res = await supertest(App).put(`/api/v1/people/${person.p1._id}`).send({
      nome: 'vinicius',
      cpf: '77606493049',
      data_nascimento: '23/04/2003',
      email: 'gabriel@exemple.com',
      senha: '123456',
      habilitado: 'sim'
    });
    expect(res.statusCode).toBe(200);
    expect(res.body.nome).toBe('vinicius');
  });

  it('PUT /api/v1/people/:id - INVALD NOT-FOUND', async () => {
    const res = await supertest(App).put(`/api/v1/people/620ebf227ce3f1fc44f00920`).send({
      nome: 'vinicius',
      cpf: '77606493049',
      data_nascimento: '23/04/2003',
      email: 'gabriel@exemple.com',
      senha: '123456',
      habilitado: 'sim'
    });
    expect(res.statusCode).toBe(404);
  });

  it('PUT /api/v1/people/:id INVALD BAD-REQUEST', async () => {
    const res = await supertest(App).put(`/api/v1/people/${person.p1._id}`).send({
      nome: '',
      cpf: '',
      data_nascimento: '',
      email: '',
      senha: '',
      habilitado: ''
    });
    expect(res.statusCode).toBe(400);
  });

  /* 
    DELETE - PEOPLE
  */

  it('DELETE /api/v1/people/:id', async () => {
    const res = await supertest(App).delete(`/api/v1/people/${person.p1._id}`);

    expect(res.statusCode).toBe(204);
  });

  it('DELETE /api/v1/people/:id - INVALID', async () => {
    const res = await supertest(App).delete(`/api/v1/people/620ebf227ce3f1fc44f00920`);

    expect(res.statusCode).toBe(404);
  });

  /* 
     authenticate
	*/

  describe('Test-Feature-Authenticate', () => {
    it('POST /api/v1/authenticate', async () => {
      const res = await supertest(App).post('/api/v1/authenticate').send({
        email: 'julia@exemple.com',
        senha: '123456'
      });
      expect(res.statusCode).toBe(200);
    });

    it('POST /api/v1/authenticate - INVALID BAD-REQUEST', async () => {
      const res = await supertest(App).post('/api/v1/authenticate').send({
        email: '',
        senha: '123456'
      });
      expect(res.statusCode).toBe(400);
    });

    it('POST /api/v1/authenticate - INVALID NOT-FOUND', async () => {
      const res = await supertest(App).post('/api/v1/authenticate').send({
        email: 'invalidemail@gamail.com',
        senha: '123456'
      });
      expect(res.statusCode).toBe(404);
    });

    it('POST /api/v1/authenticate - INVALID', async () => {
      const res = await supertest(App).post('/api/v1/authenticate').send({
        email: 'invalidemail@.com',
        senha: '123456'
      });
      expect(res.statusCode).toBe(400);
    });

    it('POST /api/v1/authenticate - INVALID', async () => {
      const res = await supertest(App).post('/api/v1/authenticate').send({
        email: 'invalidemail@gamail.com',
        senha: '1234'
      });
      expect(res.statusCode).toBe(400);
    });
  });
});
