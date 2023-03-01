import { ModelStatic } from 'sequelize';
import NotFoundError from '../utils/errors/not-found-error';
import Team from '../database/models/Team';

export default class TeamServices {
  constructor(
    private teamModel: ModelStatic<Team> = Team,
  ) {}

  public async get(): Promise<Team[]> {
    const teams = await this.teamModel.findAll();
    return teams;
  }

  public async getById(id: number): Promise<Team> {
    const team = await this.teamModel.findByPk(id);
    if (!team) {
      throw new NotFoundError('There is no team with such id!');
    }
    return team as Team;
  }
}
