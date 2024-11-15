import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {RankingModel} from './ranking.model';

@Injectable({
  providedIn: 'root'
})
export class RankingService {

  private apiUrl: string = "http://localhost:8080/api/ranking";

  constructor( private _http: HttpClient) { }

  getAllByTournamentIdAndTeam(tournamentId: number, teamId: number): Observable<RankingModel[]> {
    const params = new HttpParams()
      .set('tournamentId', tournamentId.toString())
      .set('teamId', teamId.toString());

    return this._http.get<RankingModel[]>(`${this.apiUrl}/by-tournament-team`, { params });
  }


  getAllByTournamentId(tournamentId: number): Observable<RankingModel[]> {
    return this._http.get<RankingModel[]>(`${this.apiUrl}/by-tournament/${tournamentId}`);
  }
}
