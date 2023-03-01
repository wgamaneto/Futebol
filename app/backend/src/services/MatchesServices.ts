import { ModelStatic } from 'sequelize';
import IMatchUpdate from '../interfaces/IMatchUpdate';
import ConflictError from '../utils/errors/conflict-error';
import IMatchRequest from '../interfaces/IMatchRequest';
import Match from '../database/models/Match';
import TeamServices from './TeamsServices';

const association = {
  attributes: { exclude: ['home_team', 'away_team'] },
  include: [{ all: true, attributes: { exclude: ['id'] } }],
};

export default class MatchesServices {
  constructor(
    private matchModel: ModelStatic<Match>,
    private teamServices = new TeamServices(),
  ) {}

  public async get(inProgress: string): Promise<Match[]> {
    const valid = ['true', 'false'];
    const inProgressOptions = inProgress === 'true';
    if (inProgress && valid.includes(inProgress)) {
      return this.matchModel.findAll({ where: { inProgress: inProgressOptions }, ...association });
    }
    const matches = await this.matchModel.findAll(association);
    return matches;
  }

  public async add(match: IMatchRequest): Promise<Match> {
    const verifyTeams = [match.homeTeam, match.awayTeam]
      .map((team) => this.teamServices.getById(team));

    await Promise.all(verifyTeams);

    if (match.homeTeam === match.awayTeam) {
      throw new ConflictError('It is not possible to create a match with two equal teams');
    }

    const newMatch = await this.matchModel.create({ ...match, inProgress: true });
    return newMatch;
  }

  public async update(id: number, updateData: IMatchUpdate): Promise<void> {
    const { homeTeamGoals, awayTeamGoals } = updateData;
    await this.matchModel
      .update({ homeTeamGoals, awayTeamGoals }, { where: { id } });
  }

  public async endGame(id: string): Promise<void> {
    await this.matchModel.update({ inProgress: false }, { where: { id } });
  }
}
