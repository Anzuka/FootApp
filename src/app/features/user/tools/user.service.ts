import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl: string = "http://localhost:8080";

  constructor(private _http: HttpClient) { }




  login(username: string, password: string): Observable<any> {

    const loginData = {
      username: username,
      password: password
    };
    return this._http.post(`${this.apiUrl}/login`, loginData)
  }


}
