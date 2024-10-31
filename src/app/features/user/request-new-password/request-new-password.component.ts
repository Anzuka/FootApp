import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {UserService} from '../tools/user.service';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
  selector: 'app-request-new-password',
  templateUrl: './request-new-password.component.html',
  styleUrl: './request-new-password.component.scss'
})
export class RequestNewPasswordComponent {
  requestNewPasswordForm: FormGroup;
  captchaResolved = false;
  errorMessage: string = '';

  constructor(
    private _fb: FormBuilder,
    private _router: Router,
    private _userService: UserService,
  ) {
    this.requestNewPasswordForm = this._fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  get email() {
    return this.requestNewPasswordForm.get('email')!;
  }

  onSubmit() {
    if (this.requestNewPasswordForm.valid && this.captchaResolved) {
      const email = this.requestNewPasswordForm.value.email;
      console.log("Réinitialisation de mot de passe pour:", email);

      this._userService.requestPassword(email).subscribe({
        next: (result) => {
          console.log('check your mails', result);
          this._router.navigate(["/user/request-new-password-confirmation"]);

        },
        error: (error: HttpErrorResponse) => {
          console.error('Erreur de request password : ', error);

          if (error.error) {
            this.errorMessage = error.error;
          } else {
            this.errorMessage = 'Erreur de request password , veuillez réessayer.'; // Message générique en cas de problème
          }
        }
      })
    }
  }

  onCaptchaResolved(captchaResponse: string | null) {
    this.captchaResolved = !!captchaResponse; // Met à true si le reCAPTCHA est résolu
  }

}
