import { Component } from '@angular/core';
import {UserService} from '../tools/user.service';
import {Router} from '@angular/router';
import {HttpErrorResponse} from '@angular/common/http';
import {AuthService} from '../../../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  username: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(
              private _userService: UserService,
              private _authService: AuthService,
              private _router: Router
              ) { }


  login(){
    this._userService.login(this.username, this.password).subscribe({
      next: (result) => {
        console.log('connexion réussie', result);
        localStorage.setItem('token', result.token);
        this._authService.setConnected(true);
        this._authService.setUsername(result.username);
        this._authService.setUserRole(result.role);

        this._router.navigate(['/']);
      },
      error: (error: HttpErrorResponse) => {
        console.error('Erreur de connexion:', error);

        if (error.error) {
          this.errorMessage = error.error;
        } else {
          this.errorMessage = 'Erreur de connexion, veuillez réessayer.'; // Message générique en cas de problème
        }
      }
    });
  }
}
