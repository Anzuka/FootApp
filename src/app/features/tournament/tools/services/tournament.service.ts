import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TournamentModel } from '../models/tournament.model';
import { TournamentCreateModel } from '../models/tournament.create.model';

@Injectable({
  providedIn: 'root'
})
export class TournamentService {
  private readonly _tournamentEndPoint: string = 'http://localhost:8080/api/tournament';

  constructor(private http: HttpClient) { }

  getAll(): Observable<TournamentModel[]>{
    return this.http.get<TournamentModel[]>(this._tournamentEndPoint);
  }

  getById(id: number): Observable<TournamentModel> {
    return this.http.get<TournamentModel> (`${this._tournamentEndPoint}/${id}`);
  }

  createOne(tournament: TournamentCreateModel): Observable<void>{
    return this.http.post<void>(this._tournamentEndPoint, tournament);
  }
}
