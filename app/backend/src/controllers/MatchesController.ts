import { Request, Response } from 'express';
import MatchesServices from '../services/MatchesServices';
import Match from '../database/models/Match';

export default class MatchesController {
  constructor(
    private matchesServices = new MatchesServices(Match),
  ) {}

  public async get(request: Request, response: Response): Promise<Response> {
    const inProgress = request.query.inProgress as string;
    const matches = await this.matchesServices.get(inProgress);
    return response.status(200).json(matches);
  }

  public async add(request: Request, response: Response): Promise<Response> {
    const newMatch = await this.matchesServices.add(request.body);
    return response.status(201).json(newMatch);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    await this.matchesServices.update(Number(request.params.id), request.body);
    return response.status(200).json({ message: 'Match updated' });
  }

  public async endGame(request: Request, response: Response): Promise<Response> {
    await this.matchesServices.endGame(request.params.id);
    return response.status(200).json({ message: 'Finished' });
  }
}
