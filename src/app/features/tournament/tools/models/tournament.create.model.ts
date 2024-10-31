import { TournamentStatus } from "../enums/tournament-status";
import { TournamentType } from "../enums/tournament-type";
import { Address } from "./tournament.model";

export interface TournamentCreateModel{
    title: string;
    startDate: Date;
    endDate: Date;
    placeName: string;
    address: Address;
    tournamentType: TournamentType;
    tournamentStatus: TournamentStatus;
}