import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import App from '../app';
import Team from '../database/models/Team';
import Match from '../database/models/Match';
import * as mock from './mocks'
import Model from '../database/models';
import { ILeaderBoard } from '../services/LeaderBoardServices';

chai.use(chaiHttp);
const { app } = new App();

const { expect } = chai;

describe('GET /leaderboard/home', () => {
  beforeEach(() => sinon.restore())
  it('deve retornar status 200 e o array da tabela home', async () => {
    sinon.stub(Model, 'query').resolves([mock.leaderBoardHome, []])
    const httpResponse = await chai
      .request(app)
      .get('/leaderboard/home')
    expect(httpResponse.status).to.equal(200)
    expect(httpResponse.body).to.deep.equal(mock.leaderBoardHome)
  })
}) 
describe('GET /leaderboard/away', () => {
  beforeEach(() => sinon.restore())
  it('deve retornar status 200 e o array da tabela away', async () => {
    sinon.stub(Model, 'query').resolves([mock.leaderBoardAway, []])
    const httpResponse = await chai
      .request(app)
      .get('/leaderboard/away')
    expect(httpResponse.status).to.equal(200)
    expect(httpResponse.body).to.deep.equal(mock.leaderBoardAway)
  })
}) 
describe('GET /leaderboard', () => {
  beforeEach(() => sinon.restore())
  it('deve retornar status 200', async () => {
    const leaderBoardModel = sinon.stub(Model, 'query')
    leaderBoardModel.onFirstCall().resolves([mock.leaderBoardHome, []])
    leaderBoardModel.onSecondCall().resolves([mock.leaderBoardAway, []])
    const httpResponse = await chai
      .request(app)
      .get('/leaderboard')
    expect(httpResponse.status).to.equal(200)
  })
}) 