import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { UserService } from './features/user/tools/user.service';
import { JwtService } from './core/auth/service/jwt.service';
import { jwtDecode } from 'jwt-decode';

export interface DecodedToken {
  userId: number;
  username: string;
  role: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _jwtService = inject(JwtService);
  private connected = new BehaviorSubject<boolean>(this.hasToken()); // Set based on token presence
  private username = new BehaviorSubject<string | undefined>(this.getUsername());

  constructor(private _userService: UserService) {    
   }

  login(username: string, password: string): Observable<any> {
    return this._userService.login(username, password).pipe(
      tap((response: any) => {
        if (response?.token) {
          this._jwtService.saveToken(response.token);
          //Update connected & username
          this.connected.next(true); 
          this.username.next(this.getUsername());
        }
      })
    );
  }

  logout() {
    this._jwtService.destroyToken();
    this.connected.next(false); // Ensure logged-out status
    this.username.next(undefined);
  }

  // Privilégie cette méthode plutôt que isConnected()
  isLoggedIn(): Observable<boolean> {
    return this.connected.asObservable(); // Directly use connected
  }

  getUsernameObservable() : Observable<string | undefined> {
    return this.username.asObservable();
  }
  
  private hasToken(): boolean {
    return !!this._jwtService.getToken();
  }
  // Methods to decode token information
  getDecodedToken(): DecodedToken | null {
    const token = this._jwtService.getToken();
    if (token) {
      return jwtDecode<DecodedToken>(token);
    }
    return null;
  }

  getUsername(): string | undefined{     
    return this.getDecodedToken()?.username;
  }

  getUserRole(): string | undefined {     
    return this.getDecodedToken()?.role;
  }

  getUserId(): number | undefined { 
    return this.getDecodedToken()?.userId;
  }

  isConnected(): boolean{
    return this.connected.getValue();
  }
}
