import { TournamentStatus } from '../enums/tournament-status';
import { TournamentType } from '../enums/tournament-type';

export interface TournamentModel {
  id: number; 
  title: string;
  startDate: Date; 
  endDate: Date;
  placeName: string;
  address?: Address;
  tournamentType: TournamentType;
  tournamentStatus: TournamentStatus;
  organizerId: number;
}

export interface Address {
    street: string;
    city: string;
    zip: string;
    state: string;
    country: string;
}