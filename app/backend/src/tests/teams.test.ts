import * as sinon from 'sinon';
import * as chai from 'chai';

// @ts-ignore
import chaiHttp = require('chai-http');

import App from '../app';
import Team from '../database/models/Team';
import * as mock from './mocks'

chai.use(chaiHttp);

const { expect } = chai;

const { app } = new App();

describe('GET /teams', () => {
  beforeEach(() => sinon.restore())
  describe('quando a requisição é feita com sucesso', () => {
    it('deve retornar um status 200', async () => {
      sinon.stub(Team, 'findAll').resolves(mock.teams as Team[]);
      const httpRequest = await chai.request(app).get('/teams');
      expect(httpRequest.status).to.equal(200);
    });

    it('deve retornar um array com os times cadastrados', async () => {
      sinon.stub(Team, 'findAll').resolves(mock.teams as Team[]);
      const httpRequest = await chai.request(app).get('/teams');
      expect(httpRequest.body).to.deep.equal(mock.teams);
    });
  });
});

describe('GET /teams/:id', () => {
  beforeEach(() => sinon.restore())
  describe('quando a requisição é feita com sucesso', () => {
    it('deve retornar um status 200', async () => {
      sinon.stub(Team, 'findByPk').resolves(mock.team as Team);
      const httpRequest = await chai.request(app).get('/teams/1');
      expect(httpRequest.status).to.equal(200);
    });

    it('deve retornar o time encontrado', async () => {
      sinon.stub(Team, 'findByPk').resolves(mock.team as Team);
      const httpRequest = await chai.request(app).get('/teams/1');
      expect(httpRequest.body).to.deep.equal(mock.team);
      expect(httpRequest.body).to.have.all.keys('id', 'teamName');
    });
  });
});