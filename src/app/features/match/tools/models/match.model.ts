import {MatchStatus} from './match.status';
import {TeamModel} from './team.model';

export interface MatchModel {
  id: number;
  teamHome: TeamModel;
  teamAway: TeamModel;
  scoreTeamHome: number;
  scoreTeamAway: number;
  matchStatus: MatchStatus;
  dateMatch: Date;
}
