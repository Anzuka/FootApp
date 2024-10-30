import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TournamentModel } from '../models/tournament.model';

@Injectable({
  providedIn: 'root'
})
export class TournamentService {
  private readonly _tournamentEndPoint: string = 'http://localhost:8080/api/tournament';

  constructor(private http: HttpClient) { }

  getAll(): Observable<TournamentModel[]>{
    return this.http.get<TournamentModel[]>(this._tournamentEndPoint);
  }
}
