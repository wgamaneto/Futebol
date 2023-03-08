import { ModelStatic, Op } from 'sequelize';
import Invalid from '../utils/errors/classE';
import { CreateMatch } from '../interfaces/CreatMatch';
import { EditMatch } from '../interfaces/EditMatch';
import Team from '../database/models/Team';
import Match from '../database/models/Match';

export default class MatcheService {
  protected model: ModelStatic<Match> = Match;

  async getAllMatches(inProgress?: boolean): Promise<Match[]> {
    if (inProgress === undefined) {
      const result = await this.model.findAll(
        { include: [
          { model: Team, as: 'homeTeam', attributes: ['teamName'] },
          { model: Team, as: 'awayTeam', attributes: ['teamName'] },
        ] },
      );
      return result;
    }
    const result = await this.model.findAll(
      { include: [
        { model: Team, as: 'homeTeam', attributes: ['teamName'] },
        { model: Team, as: 'awayTeam', attributes: ['teamName'] },
      ],
      where: { [Op.and]: [{ inProgress }] } },
    );
    return result;
  }

  async finishMatche(id: number): Promise<number[] | undefined> {
    const result = await this.model.update({ inProgress: false }, { where: { id } });
    return result;
  }

  async EditMatche(id: number, body: EditMatch): Promise<number[] | undefined> {
    const result = await this.model.update({ homeTeamGoals: body.homeTeamGoals,
      awayTeamGoals: body.awayTeamGoals }, { where: { id } });
    return result;
  }

  async CreateMatche(
    { homeTeamId, awayTeamId, homeTeamGoals, awayTeamGoals }: CreateMatch,
  ): Promise<Match> {
    try {
      if (homeTeamId === awayTeamId) {
        throw new Invalid('It is not possible to create a match with two equal teams', 422);
      }
      const result = await this.model.create(
        { homeTeamId, awayTeamId, homeTeamGoals, awayTeamGoals, inProgress: true },
      );
      return result;
    } catch (err) {
      const error = err as Error;
      throw new Error(error.message);
    }
  }
}
