import {TeamModel} from './team.model';
import {MatchStatus} from './match.status';
import {MatchStage} from './match.stage';
import {RefereeDTO} from './refereeDTO';

export interface MatchDetailsModel {
  id: number;
  teamHome: TeamModel;
  teamAway: TeamModel;
  refereeDTO: RefereeDTO | null;
  scoreTeamHome: number;
  scoreTeamAway: number;
  matchStatus: MatchStatus;
  matchStage: MatchStage;
  matchDate: Date;
  fieldLocation: string;
}
