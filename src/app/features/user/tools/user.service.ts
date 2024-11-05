import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {UserRegisterModel} from '../sign-up/models/user.register.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl: string = "http://localhost:8080";

  constructor(private _http: HttpClient) { }

  register(user: UserRegisterModel): Observable<string> {
    return this._http.post<string>(`${this.apiUrl}/register`, user);
  }

  login(username: string, password: string): Observable<any> {

    const loginData = {
      username: username,
      password: password
    };
    return this._http.post(`${this.apiUrl}/login`, loginData)
  }


  requestPassword(email: string): Observable<any>{
    const data = {
      email: email
    }
    return this._http.post(`${this.apiUrl}/request-password`, data)
  }

  resetPassword(token: string, password: string, confirmPassword: string): Observable<any> {
    const data = { password: password, confirmPassword: confirmPassword }; // Assurez-vous que ces champs correspondent à PasswordResetForm
    return this._http.post(`${this.apiUrl}/reset-password?token=${token}`, data);
  }

  requestNewPasswordToken(url: string): Observable<any> {
    return this._http.get(url, {});
  }


}
