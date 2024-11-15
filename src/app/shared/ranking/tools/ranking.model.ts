import {TournamentSmallDetailsDTO} from './tournament.small.details-dto';
import {TeamSmallDetailsDTO} from './team.small.details-dto';

export interface RankingModel {
  id: number;
  team :TeamSmallDetailsDTO;
  tournament:TournamentSmallDetailsDTO;
  rankingStatus: string;
  numGroup: number;
  rankingPosition: number;
  totalPoints: number;
  nbMatchPlayed : number;
  nbWins : number;
  nbLosses : number;
  nbDraws : number;
  goalsFor : number;
  goalsAgainst : number;
  goalsDiff: number;
}
