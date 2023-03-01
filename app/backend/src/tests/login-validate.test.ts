import * as sinon from 'sinon';
import * as chai from 'chai';

// @ts-ignore
import chaiHttp = require('chai-http');

import App from '../app';

import * as jwt from 'jsonwebtoken';

chai.use(chaiHttp);

const { expect } = chai;

const { app } = new App();

describe('GET /login/validate', () => {
  beforeEach(() => sinon.restore());
  describe('quando o token é válido', () => {
    it('deve retornar a função do usuário e um status 200', async () => {
      const payload = { role: 'admin' };
      sinon.stub(jwt, 'verify').callsFake(() => payload)
      const httpResponse = await chai
        .request(app)
        .get('/login/validate')
        .set('Authorization', 'valid_token');
      expect(httpResponse.status).to.equal(200);
      expect(httpResponse.body).to.deep.equal(payload)
    });
  });

  describe('quando o token é inválido ou foi expirado', () => {
    it('deve retornar um status 401', async () => {
      sinon.stub(jwt, 'verify').throws()
      const httpResponse = await chai
        .request(app)
        .get('/login/validate')
        .set('Authorization', 'invalid_token');
      expect(httpResponse.status).to.equal(401);
    });
  });

  describe('quando o token não é informado', () => {
    it('deve retornar um status 401', async () => {
      const httpResponse = await chai
        .request(app)
        .get('/login/validate');
      expect(httpResponse.status).to.equal(401);
    });
  });
});