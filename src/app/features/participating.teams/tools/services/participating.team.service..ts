import { Injectable } from '@angular/core';
import { ParticipatingTeamModel } from '../models/participating.team.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ParticipatingTeamService {
  private readonly _tournamentEndPoint: string = 'http://localhost:8080/api/participatingteam';

  constructor(private http: HttpClient) { }

  getByTournament(id: number): Observable<ParticipatingTeamModel[]>{
    return this.http.get<ParticipatingTeamModel[]> (`${this._tournamentEndPoint}/by-tournament/${id}`);
  }
}