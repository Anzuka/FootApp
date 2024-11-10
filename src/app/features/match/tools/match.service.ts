import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {MatchModel} from './models/match.model';

@Injectable({
  providedIn: 'root'
})
export class MatchService {

  private apiUrl: string = "http://localhost:8080/api/footmatch";

  constructor(private _http: HttpClient) { }

  getAllMatches(): Observable<MatchModel[]> {
    return this._http.get<MatchModel[]>(`${this.apiUrl}`, {})
  }

}
