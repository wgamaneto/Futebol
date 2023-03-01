import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import App from '../app';
import Server, { PORT } from '../server'

chai.use(chaiHttp);

const { app } = new App();
// const { expect } = chai;

describe('Testes do APP', () => {
  beforeEach(() => sinon.restore())
  describe('Testa rota default do projeto', () => {
    it('deve retornar um status 200', async () => {
      const httpResponse = await chai.request(app).get('/');
      chai.expect(httpResponse.status).to.equal(200)
    });

    it('deve retonar mensagem "ok"', async () => {
      const httpResponse = await chai.request(app).get('/');
      chai.expect(httpResponse.body).to.deep.equal({ ok: true })
    });
  });

  describe('Erros não tratados', () => {
    it('devem ser captados pelo middleware de erro com status 500', async () => {
      const httpResponse = await chai.request(app).get('/internal-error');
      chai.expect(httpResponse.status).to.equal(500);
    });
  });
});
