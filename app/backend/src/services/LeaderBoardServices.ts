import Model from '../database/models';
import leaderBoardHomeQuery from './queries/leaderBoardHome';
import leaderBoardAwayQuery from './queries/leaderBoardAway';

export interface ILeaderBoard {
  name: number
  totalPoints: number
  totalGames: number
  totalVictories: number
  totalDraws: number
  totalLosses: number
  goalsFavor: number
  goalsOwn: number
  goalsBalance: number
  efficiency: string
}

export default class LeaderBoardServices {
  constructor(
    private model = Model,
  ) {}

  static calculateEfficiency = (homeTeam: ILeaderBoard, team: ILeaderBoard) => {
    const totalPoints = homeTeam.totalPoints + team.totalPoints;
    const totalGames = homeTeam.totalGames + team.totalGames;
    return ((totalPoints / (totalGames * 3)) * 100).toFixed(2);
  };

  static createLeaderBoard = (homeTeam: ILeaderBoard, team: ILeaderBoard) => ({
    ...homeTeam,
    totalPoints: homeTeam.totalPoints + team.totalPoints,
    totalGames: homeTeam.totalGames + team.totalGames,
    totalVictories: homeTeam.totalVictories + team.totalVictories,
    totalDraws: homeTeam.totalDraws + team.totalDraws,
    totalLosses: homeTeam.totalLosses + team.totalLosses,
    goalsFavor: homeTeam.goalsFavor + team.goalsFavor,
    goalsOwn: homeTeam.goalsOwn + team.goalsOwn,
    goalsBalance: homeTeam.goalsBalance + team.goalsBalance,
    efficiency: LeaderBoardServices.calculateEfficiency(homeTeam, team),
  });

  static sortLeaderBoard(board: ILeaderBoard[]) {
    return board.sort((a, b) =>
      b.totalPoints - a.totalPoints
      || b.totalVictories - a.totalVictories
      || b.goalsBalance - a.goalsBalance
      || b.goalsFavor - a.goalsFavor);
  }

  async get(url: string): Promise<ILeaderBoard[]> {
    if (url === '/home') {
      const [leaderBoardHome] = await this.model.query(leaderBoardHomeQuery);
      return leaderBoardHome as ILeaderBoard[];
    }
    const [leaderBoardAway] = await this.model.query(leaderBoardAwayQuery);
    return leaderBoardAway as ILeaderBoard[];
  }

  async getLeaderBoard(): Promise<ILeaderBoard[]> {
    const [leaderBoardHome] = await this.model.query(leaderBoardHomeQuery) as ILeaderBoard[][];
    const [leaderBoardAway] = await this.model.query(leaderBoardAwayQuery) as ILeaderBoard[][];
    const leaderBoard = leaderBoardHome.map((homeTeam) => {
      const [team] = leaderBoardAway.filter((awayTeam) => awayTeam.name === homeTeam.name);
      return LeaderBoardServices.createLeaderBoard(homeTeam, team);
    });
    return LeaderBoardServices.sortLeaderBoard(leaderBoard);
  }
}
