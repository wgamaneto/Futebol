import { EditMatch } from './EditMatch';

export interface CreateMatch extends EditMatch {
  homeTeamId: number;
  awayTeamId: number;
}
