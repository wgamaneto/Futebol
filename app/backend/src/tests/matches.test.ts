import * as sinon from 'sinon';
import * as chai from 'chai';
import * as jwt from 'jsonwebtoken'
// @ts-ignore
import chaiHttp = require('chai-http');

import App from '../app';
import Team from '../database/models/Team';
import Match from '../database/models/Match';
import * as mock from './mocks'

chai.use(chaiHttp);

const { expect } = chai;

const { app } = new App();

describe('GET /matches', () => {
  beforeEach(() => sinon.restore())
  describe('quando a requisição é feita com sucesso', () => {
    it('deve retornar um status 200 com um array de partidas', async () => {
      sinon.stub(Match, 'findAll').resolves(mock.matches as unknown as Match[]);
      const httpResponse = await chai.request(app).get('/matches');
      expect(httpResponse.status).to.equal(200);
      expect(httpResponse.body).to.deep.equal(mock.matches)
    });
  });

  describe('quando é informada uma "querystring"', () => {
    describe('caso a querystring for false', () => {
      it('deve retornar apenas as partidas em andamento', async () => {
        sinon.stub(Match, 'findAll').resolves(mock.matchInProgressFalse as unknown as Match[]);
        const httpResponse = await chai.request(app).get('/matches?inProgress=false')
        httpResponse.body.forEach((match: Match) => 
          expect(match.inProgress).to.be.false)
      });
    });

    describe('caso a querystring for true', () => {
      it('deve retornar apenas as partidas em andamento', async () => {
        sinon.stub(Match, 'findAll').resolves(mock.matchInProgressTrue as unknown as Match[]);
        const httpResponse = await chai.request(app).get('/matches?inProgress=true')
        httpResponse.body.forEach((match: Match) => 
          expect(match.inProgress).to.be.true)
      });
    });
  });
});

describe('POST /matches', () => {
  beforeEach(() => sinon.restore())
  describe('quando um dos times não existe', () => {
    it('deve retornar status 404', async () => {
      sinon.stub(jwt, 'verify').callsFake(() => mock.userMock)
      sinon.stub(Team, 'findByPk').resolves(null)
      const httpResponse = await chai
        .request(app)
        .post('/matches')
        .send(mock.newMatchBody)
        .set('authorization', 'token')
      expect(httpResponse.status).to.equal(404)
    })
  })

  describe('quando um a requisicao tem times iguais', () => {
    it('deve retornar status 422', async () => {
      sinon.stub(jwt, 'verify').callsFake(() => mock.userMock)
      sinon.stub(Team, 'findByPk').resolves(mock.team as Team)
      const httpResponse = await chai
        .request(app)
        .post('/matches')
        .send(mock.newMatchEqualTeamsBody)
        .set('authorization', 'token')
      expect(httpResponse.status).to.equal(422)
    })
  })

  describe('quando a requisição é feita com sucesso', () => {
    it('deve retornar um status 201 com a partida criada', async () => {
      sinon.stub(jwt, 'verify').callsFake(() => mock.userMock)
      sinon.stub(Team, 'findByPk').resolves(mock.team as Team)
      sinon.stub(Match, 'create').resolves(mock.newMatch as Match);
      const httpResponse = await chai
        .request(app)
        .post('/matches')
        .send(mock.newMatchBody)
        .set('authorization', 'token')
      expect(httpResponse.status).to.equal(201)
    });
  });
});

describe('PATCH /matches/:id', () => {
  beforeEach(() => sinon.restore());
  it('deve retornar um status 200', async () => {
    sinon.stub(Match, 'update').resolves()
    const httpResponse = await chai
      .request(app)
      .patch('/matches/1')
      .send(mock.updateMatchBody)
    expect(httpResponse.status).to.equal(200)
  })
})

describe('PATCH /matches/:id/finish', () => {
  beforeEach(() => sinon.restore());
  it('deve retornar um status 200', async () => {
    sinon.stub(jwt, 'verify').callsFake(() => mock.userMock)
    sinon.stub(Match, 'update').resolves()
    const httpResponse = await chai
      .request(app)
      .patch('/matches/1/finish')
      .send()
      .set('authorization', 'token')
    expect(httpResponse.status).to.equal(200)
  })

  it('não é possivel finalizar um jogo sem estar logado', async () => {
    const httpResponse = await chai
      .request(app)
      .patch('/matches/1/finish')
    expect(httpResponse.status).to.equal(401)
  })
})