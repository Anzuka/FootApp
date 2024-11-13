import {TeamModel} from './team.model';
import {MatchStatus} from './match.status';
import {MatchStage} from './match.stage';
import {RefereeDTO} from './refereeDTO';
import {TournamentSmallDetailsDTO} from './tournament.small.details-dto';

export interface MatchDetailsModel {
  id: number;
  teamHome: TeamModel;
  teamAway: TeamModel;
  tournamentSmallDetailsDTO: TournamentSmallDetailsDTO;
  refereeDTO: RefereeDTO | null;
  scoreTeamHome: number;
  scoreTeamAway: number;
  matchStatus: MatchStatus;
  matchStage: MatchStage;
  matchDate: Date;
  fieldLocation: string;
}
