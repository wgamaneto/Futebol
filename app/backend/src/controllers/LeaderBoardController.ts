import { Request, Response } from 'express';
import LeaderBoardService from '../services/LeaderBoardServices';

export default class LeaderBoardController {
  constructor(
    private leaderBoardService = new LeaderBoardService(),
  ) {}

  async get(request: Request, response: Response): Promise<Response> {
    const { url } = request;
    console.log(url);

    const leaderBoard = await this.leaderBoardService.get(url);
    return response.status(200).json(leaderBoard);
  }

  async getLeaderBoard(_request: Request, response: Response): Promise<Response> {
    const leaderBoard = await this.leaderBoardService.getLeaderBoard();
    return response.status(200).json(leaderBoard);
  }
}
