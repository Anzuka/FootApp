import { Component } from '@angular/core';
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
              private _authService: AuthService,
              private _router: Router
              ) { }


  login(){
    this._authService.login(this.username, this.password).subscribe({
      next: () =>{
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
