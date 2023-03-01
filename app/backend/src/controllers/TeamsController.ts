import { Request, Response } from 'express';
import TeamsServices from '../services/TeamsServices';

export default class TeamsController {
  constructor(
    private teamsServices = new TeamsServices(),
  ) {}

  public async get(_request: Request, response: Response): Promise<Response> {
    const teams = await this.teamsServices.get();
    return response.status(200).json(teams);
  }

  public async getById(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const team = await this.teamsServices.getById(Number(id));
    return response.status(200).json(team);
  }
}
