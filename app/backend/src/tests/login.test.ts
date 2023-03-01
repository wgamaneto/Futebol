import JWT from '../utils/jwtUtils/JWT';
import * as sinon from 'sinon';
import * as chai from 'chai';
import * as bcrypt from 'bcryptjs';

// @ts-ignore
import chaiHttp = require('chai-http');

import App from '../app';
import User from '../database/models/User';

import * as mock from './mocks'

chai.use(chaiHttp);

const { app } = new App();

const { expect } = chai;

describe('POST /login', () => {
  beforeEach(() => sinon.restore())

  describe('quando o login não é realizado com sucesso', () => {

    describe('quando o email não é enviado', () => {
      it('deve retornar um status 400', async () => {
        const httpResponse = await chai.request(app).post('/login').send(mock.noEmailLoginBody);
        expect(httpResponse.status).to.equal(400);
        expect(httpResponse.body).to.be.deep.equal({ message: 'All fields must be filled' })
      });
    });

    describe('quando o password não é enviado', () => {
      it('deve retornar um status 400', async () => {
        const noPasswordLoginBody = { email: 'valid_email@mail.com'};
        const httpResponse = await chai.request(app).post('/login').send(noPasswordLoginBody);
        expect(httpResponse.status).to.equal(400);
        expect(httpResponse.body).to.be.deep.equal({ message: 'All fields must be filled' })
      });
    });

    describe('quando o email é inválido', () => {
      it('deve retornar um status 401', async () => {
        const httpResponse = await chai.request(app).post('/login').send(mock.invalidEmailLoginBody);
        expect(httpResponse.status).to.equal(401);
        expect(httpResponse.body).to.be.deep.equal({ message: 'Incorrect email or password' })
      });
    });

    describe('se o usuário não é encontrado', () => {
      it('deve retornar um status 401', async () => {
        sinon.stub(User, 'findOne').resolves(null);
        sinon.stub(bcrypt, 'compareSync').returns(false)
        const httpResponse = await chai.request(app).post('/login').send(mock.validLoginBody);
        expect(httpResponse.status).to.equal(401);
        expect(httpResponse.body).to.be.deep.equal({ message: 'Incorrect email or password' })
      });
    });

    describe('se a senha é inválida', () => {
      it('deve retornar um status 401', async () => {
        sinon.stub(User, 'findOne').resolves(mock.userMock as User)
        sinon.stub(bcrypt, 'compareSync').returns(false)
        const httpResponse = await chai.request(app).post('/login').send(mock.validLoginBody);
        expect(httpResponse.status).to.equal(401);
        expect(httpResponse.body).to.be.deep.equal({ message: 'Incorrect email or password'});
      });
    });
  });

  describe('se o login é feito com sucesso', () => {
    it('deve retornar um status 200', async () => {
      sinon.stub(User, 'findOne').resolves(mock.userMock as User)
      sinon.stub(bcrypt, 'compareSync').returns(true)
      const httpResponse = await chai.request(app).post('/login').send(mock.validLoginBody);
      expect(httpResponse.status).to.equal(200);
    });

    it('deve retornar um token', async () => {
      sinon.stub(User, 'findOne').resolves(mock.userMock as User)
      sinon.stub(bcrypt, 'compareSync').returns(true)
      const httpResponse = await chai.request(app).post('/login').send(mock.validLoginBody);
      expect(httpResponse.body).to.have.key('token')
    });
  });
});