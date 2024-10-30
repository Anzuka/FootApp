import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private connected: boolean = false;
  private username: string = '';
  private userRole: string = '';

  constructor() { }

  isConnected() { return this.connected; }
  setConnected(value: boolean) { this.connected = value; }

  getUsername(): string { return this.username; }
  setUsername(value: string) { this.username = value; }

  getUserRole(): string { return this.userRole; }
  setUserRole(value: string) { this.userRole = value; }

}
