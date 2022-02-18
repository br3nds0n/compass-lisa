const supertest = require('supertest');
const mongoose = require('mongoose');

const App = require('../database/index');
const RentalService = require('../../src/app/service/RentalService');

const rental = {};

describe('Test-Feature-Rental', () => {
  beforeAll(async () => {
    rental.r1 = await RentalService.create({
      nome: 'Fiat',
      cnpj: '16701716000156',
      atividades: 'Venda de Automóveis',
      endereco: [
        {
          cep: '54335000',
          number: '105',
          isFilial: false
        }
      ]
    });

    rental.r2 = await RentalService.create({
      nome: 'CompassLisa',
      cnpj: '87145813000158',
      atividades: 'Venda de Automóveis',
      endereco: [
        {
          cep: '52130090',
          number: '428',
          complemento: '1 andar',
          isFilial: true
        }
      ]
    });
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  /* 
    GET - RENTAL
  */

  it('GET /api/v1/rental - find All', async () => {
    const res = await supertest(App).get('/api/v1/rental');

    expect(res.statusCode).toBe(200);
  });

  it('GET /api/v1/rental - find All', async () => {
    const res = await supertest(App).get('/api/v1/rental?cnpj=123');

    expect(res.statusCode).toBe(400);
  });

  it('GET /api/v1/rental - INVALID', async () => {
    const res = await supertest(App).get('/api/v1/renta');

    expect(res.statusCode).toBe(404);
  });

  /* 
    GET/:id - RENTAL
  */

  it('GET/:id /api/v1/rental/:id', async () => {
    const res = await supertest(App).get(`/api/v1/rental/${rental.r1._id}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.nome).toBe('Fiat');
  });

  it('GET/:id /api/v1/rental/:id - INVALID', async () => {
    const res = await supertest(App).get(`/api/v1/rental/620ebf227ce3f1fc44f00920`);

    expect(res.statusCode).toBe(404);
  });

  /* 
    POST - RENTAL
  */

  it('POST /api/v1/rental', async () => {
    const res = await supertest(App)
      .post('/api/v1/rental')
      .send({
        nome: 'CompassLisa',
        cnpj: '01900700000103',
        atividades: 'Venda de Automóveis',
        endereco: [
          {
            cep: '60761820',
            number: '123',
            complemento: '1 andar',
            isFilial: true
          }
        ]
      });

    expect(res.statusCode).toBe(201);
  });

  it('POST /api/v1/rental - INVALID', async () => {
    const res = await supertest(App)
      .post('/api/v1/rental')
      .send({
        nome: '',
        cnpj: '',
        atividades: '',
        endereco: [
          {
            cep: '',
            number: '',
            complemento: '',
            isFilial: true
          }
        ]
      });

    expect(res.statusCode).toBe(400);
  });

  it('POST /api/v1/rental - INVALID CONFLICT CNPJ', async () => {
    const res = await supertest(App)
      .post('/api/v1/rental')
      .send({
        nome: 'Fiat',
        cnpj: '01900700000103',
        atividades: 'Venda de Automóveis',
        endereco: [
          {
            cep: '78140320',
            number: '123',
            complemento: '1 andar',
            isFilial: true
          }
        ]
      });

    expect(res.statusCode).toBe(409);
  });

  it('POST /api/v1/rental - INVALID CONFLICT CEP', async () => {
    const res = await supertest(App)
      .post('/api/v1/rental')
      .send({
        nome: 'Fiat',
        cnpj: '35799845000173',
        atividades: 'Venda de Automóveis',
        endereco: [
          {
            cep: '60761820',
            number: '123',
            complemento: '1 andar',
            isFilial: true
          }
        ]
      });

    expect(res.statusCode).toBe(409);
  });

  /* 
    PUT - RENTAL
  */

  it('PUT /api/v1/rental/:id ', async () => {
    const res = await supertest(App)
      .put(`/api/v1/rental/${rental.r1._id}`)
      .send({
        nome: 'renault',
        cnpj: '16701716000156',
        atividades: 'Venda de Automóveis',
        endereco: [
          {
            cep: '54335000',
            number: '105',
            isFilial: false
          }
        ]
      });
    expect(res.statusCode).toBe(200);
    expect(res.body.nome).toBe('renault');
  });

  it('PUT /api/v1/rental/:id - INVALD NOT-FOUND', async () => {
    const res = await supertest(App)
      .put(`/api/v1/rental/620ebf227ce3f1fc44f00920`)
      .send({
        nome: 'renault',
        cnpj: '16701716000156',
        atividades: 'Venda de Automóveis',
        endereco: [
          {
            cep: '54335000',
            number: '105',
            isFilial: false
          }
        ]
      });
    expect(res.statusCode).toBe(404);
  });

  it('PUT /api/v1/rental/:id - INVALD FORMAT ID', async () => {
    const res = await supertest(App)
      .put(`/api/v1/rental/620ebf227ce3f1fc4`)
      .send({
        nome: 'renault',
        cnpj: '16701716000156',
        atividades: 'Venda de Automóveis',
        endereco: [
          {
            cep: '54335000',
            number: '105',
            isFilial: false
          }
        ]
      });
    expect(res.statusCode).toBe(400);
  });

  it('PUT /api/v1/people/:id INVALD BAD-REQUEST', async () => {
    const res = await supertest(App)
      .put(`/api/v1/people/${rental.r1._id}`)
      .send({
        nome: '',
        cnpj: '',
        atividades: 'Venda de Automóveis',
        endereco: [
          {
            cep: '54335000',
            number: '105',
            isFilial: false
          }
        ]
      });
    expect(res.statusCode).toBe(400);
  });

  /* 
    DELETE - RENTAL
  */

  it('DELETE /api/v1/rental/:id', async () => {
    const res = await supertest(App).delete(`/api/v1/rental/${rental.r1._id}`);

    expect(res.statusCode).toBe(204);
  });

  it('DELETE /api/v1/rental/:id - INVALID ID', async () => {
    const res = await supertest(App).delete(`/api/v1/rental/620ebf227ce3f1fc44f00920`);

    expect(res.statusCode).toBe(404);
  });

  it('DELETE /api/v1/rental/:id - INVALID FORMAT ID', async () => {
    const res = await supertest(App).delete(`/api/v1/rental/620ebf227ce3f1fc44`);

    expect(res.statusCode).toBe(400);
  });
});
