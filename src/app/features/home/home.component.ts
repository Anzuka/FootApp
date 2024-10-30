import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit{

  username?: string = '' || undefined;
  role?: string = '' || undefined;

  constructor(private _authService: AuthService) { }
  ngOnInit() {
    console.log("connected : " ,this._authService.isConnected())
    this.username = this._authService.getUsername();
    this.role = this._authService.getUserRole();
  }
}
