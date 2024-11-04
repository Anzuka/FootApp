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
  showFeedback = false;
  feedbackMessage: string = '';
  isSuccess: boolean = true;
  buttonText: string = '';
  buttonAction: () => void = () => {};


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
          this.isSuccess = true;
          this.feedbackMessage = "We've just sent you an email with instructions to reset your password. Please check your inbox and follow the link to complete the process.";
          this.showFeedback = true;
          this.buttonText = 'Back to login';
          this.buttonAction = () => {
            this._router.navigate(['/login']);
          }


        },
        error: (error: HttpErrorResponse) => {
          console.error('Erreur de request password : ', error);
          console.log('Contenu de error.error : ', error.error); // Ajoute cette ligne

          // Assigne le message d'erreur correctement
          if (error.error && typeof error.error === 'object' && error.error.error) {
            this.feedbackMessage = error.error.error;
          } else {
            this.feedbackMessage = 'An error occurred while requesting a password reset. Please try again.';
          }

          this.isSuccess = false;
          this.showFeedback = true;
          this.buttonText = 'Retry';
          this.buttonAction = () => {
            this._router.navigate(['/user/request-new-password']);
          }

        }
      })
    }
  }

  onCaptchaResolved(captchaResponse: string | null) {
    this.captchaResolved = !!captchaResponse; // Met à true si le reCAPTCHA est résolu
  }
}
