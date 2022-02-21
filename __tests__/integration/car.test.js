const supertest = require('supertest');
const mongoose = require('mongoose');

const App = require('../database/index');

const CarService = require('../../src/app/service/CarService');
const AuthService = require('../../src/app/service/AuthService');
const PersonService = require('../../src/app/service/PersonService');

const car = {};
let token = '';

describe('Test-Feature-Rental', () => {
  beforeAll(async () => {
    car.c1 = await CarService.create({
      modelo: 'fiat',
      cor: 'preto',
      ano: '2010',
      acessorios: [
        {
          descricao: 'Ar-condicionado'
        },
        {
          descricao: '4 portas'
        }
      ],
      quantidadePassageiros: 5
    });

    car.c2 = await CarService.create({
      modelo: 'fiat',
      cor: 'preto',
      ano: '2010',
      acessorios: [
        {
          descricao: '4 portas'
        }
      ],
      quantidadePassageiros: 5
    });

    await PersonService.create({
      nome: 'token',
      cpf: '42085804020',
      data_nascimento: '23/04/2003',
      email: 'token@exemple.com',
      senha: '123456',
      habilitado: 'sim'
    });

    const tokenBerer = await AuthService.findAuth({
      email: 'token@exemple.com',
      senha: '123456'
    });
    token = `Bearer ${tokenBerer.token}`;
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  /* 
    GET - CAR
  */

  it('GET /api/v1/car - find All', async () => {
    const res = await supertest(App).get('/api/v1/car').set('authorization', token);

    expect(res.statusCode).toBe(200);
  });

  it('GET /api/v1/car - find All', async () => {
    const res = await supertest(App).get('/api/v1/car?ano=4').set('authorization', token);

    expect(res.statusCode).toBe(400);
  });

  it('GET /api/v1/car - INVALID', async () => {
    const res = await supertest(App).get('/api/v1/ca').set('authorization', token);

    expect(res.statusCode).toBe(404);
  });

  it('GET /api/v1/car - UNAUTHORIZED', async () => {
    const res = await supertest(App).get('/api/v1/car');

    expect(res.statusCode).toBe(401);
  });

  /* 
    GET/:id - CAR
  */

  it('GET/:id /api/v1/car/:id', async () => {
    const res = await supertest(App).get(`/api/v1/car/${car.c1._id}`).set('authorization', token);

    expect(res.statusCode).toBe(200);
    expect(res.body.modelo).toBe('fiat');
  });

  it('GET/:id /api/v1/car/:id - INVALID', async () => {
    const res = await supertest(App).get(`/api/v1/car/620ebf227ce3f1fc44f00920`).set('authorization', token);

    expect(res.statusCode).toBe(404);
  });

  it('GET/:id /api/v1/car/:id - UNAUTHORIZED', async () => {
    const res = await supertest(App).get(`/api/v1/car/${car.c1._id}`);

    expect(res.statusCode).toBe(401);
  });

  /* 
    POST - CAR
  */

  it('POST /api/v1/car', async () => {
    const res = await supertest(App)
      .post('/api/v1/car')
      .set('authorization', token)
      .send({
        modelo: 'ferrari de diego',
        cor: 'preto',
        ano: '2020',
        acessorios: [
          {
            descricao: 'Ar-condicionado'
          },
          {
            descricao: '4 portas'
          }
        ],
        quantidadePassageiros: 5
      });

    expect(res.statusCode).toBe(201);
  });

  it('POST /api/v1/car - INVALID', async () => {
    const res = await supertest(App)
      .post('/api/v1/car')
      .set('authorization', token)
      .send({
        modelo: '',
        cor: '',
        ano: '',
        acessorios: [
          {
            descricao: ''
          },
          {
            descricao: ''
          }
        ],
        quantidadePassageiros: 5
      });

    expect(res.statusCode).toBe(400);
  });

  it('POST /api/v1/car - UNAUTHORIZED', async () => {
    const res = await supertest(App)
      .post('/api/v1/car')
      .send({
        modelo: 'ferrari de diego',
        cor: 'preto',
        ano: '2020',
        acessorios: [
          {
            descricao: 'Ar-condicionado'
          },
          {
            descricao: '4 portas'
          }
        ],
        quantidadePassageiros: 5
      });

    expect(res.statusCode).toBe(401);
  });

  /* 
    PUT - CAR
  */

  it('PUT /api/v1/car/:id ', async () => {
    const res = await supertest(App)
      .put(`/api/v1/car/${car.c1._id}`)
      .set('authorization', token)
      .send({
        modelo: 'ferrari',
        cor: 'vermelha',
        ano: '2020',
        acessorios: [
          {
            descricao: '4 portas'
          },
          {
            descricao: 'Ar condicionado'
          }
        ],
        quantidadePassageiros: 5
      });
    expect(res.statusCode).toBe(200);
    expect(res.body.modelo).toBe('ferrari');
  });

  it('PUT /api/v1/car/:id - INVALD NOT-FOUND', async () => {
    const res = await supertest(App)
      .put(`/api/v1/car/620ebf227ce3f1fc44f00920`)
      .set('authorization', token)
      .send({
        modelo: 'fiat',
        cor: 'branco',
        ano: '2020',
        acessorios: [
          {
            descricao: '4 portas'
          },
          {
            descricao: 'freio hidraulico'
          }
        ],
        quantidadePassageiros: 5
      });
    expect(res.statusCode).toBe(404);
  });

  it('PUT /api/v1/car/:id INVALD BAD-REQUEST', async () => {
    const res = await supertest(App)
      .put(`/api/v1/car/${car.c1._id}`)
      .set('authorization', token)
      .send({
        modelo: '',
        cor: '',
        ano: '',
        acessorios: [
          {
            descricao: ''
          },
          {
            descricao: ''
          }
        ],
        quantidadePassageiros: 5
      });
    expect(res.statusCode).toBe(400);
  });

  it('PUT /api/v1/car/:id - UNAUTHORIZED', async () => {
    const res = await supertest(App)
      .put(`/api/v1/car/${car.c1._id}`)
      .send({
        modelo: 'ferrari',
        cor: 'vermelha',
        ano: '2020',
        acessorios: [
          {
            descricao: '4 portas'
          },
          {
            descricao: 'Ar condicionado'
          }
        ],
        quantidadePassageiros: 5
      });
    expect(res.statusCode).toBe(401);
  });

  /* 
    DELETE - CAR
  */

  it('DELETE /api/v1/car/:id', async () => {
    const res = await supertest(App).delete(`/api/v1/car/${car.c1._id}`).set('authorization', token);

    expect(res.statusCode).toBe(204);
  });

  it('DELETE /api/v1/car/:id - INVALID', async () => {
    const res = await supertest(App).delete(`/api/v1/car/620ebf227ce3f1fc44f00920`).set('authorization', token);

    expect(res.statusCode).toBe(404);
  });

  it('DELETE /api/v1/car/:id - UNAUTHORIZED', async () => {
    const res = await supertest(App).delete(`/api/v1/car/${car.c1._id}`);

    expect(res.statusCode).toBe(401);
  });

  /*
    PATCH CAR
  */

  it('PATCH /api/v1/car/', async () => {
    const res = await supertest(App)
      .patch(`/api/v1/car/${car.c1._id}/acessorios/${car.c1.acessorios[0]._id}`)
      .set('authorization', token)
      .send({ descricao: 'Ar-descondicionado' });
    expect(res.statusCode).toBe(200);
  });

  it('PATCH /api/v1/car/ UNAUTHORIZED', async () => {
    const res = await supertest(App)
      .patch(`/api/v1/car/${car.c1._id}/acessorios/${car.c1.acessorios[0]._id}`)
      .send({ descricao: 'Ar-descondicionado' });
    expect(res.statusCode).toBe(401);
  });

  it('PATCH /api/v1/car/ - Bad Request', async () => {
    const res = await supertest(App)
      .patch(`/api/v1/car/${car.c1._id}/acessorios/${car.c1.acessorios[0]._id}`)
      .set('authorization', token)
      .send({ descricao: '' });
    expect(res.statusCode).toBe(400);
  });

  it('PATCH /api/v1/car/ - Not Found', async () => {
    const res = await supertest(App)
      .patch(`/api/v1/car//acessorios/`)
      .set('authorization', token)
      .send({ descricao: 'Ar-descondicionado' });
    expect(res.statusCode).toBe(404);
  });
});
