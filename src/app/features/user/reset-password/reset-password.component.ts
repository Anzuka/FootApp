import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {UserService} from '../tools/user.service';
import {passwordStrengthValidator} from '../tools/validators/password-strength-validator';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.scss'
})
export class ResetPasswordComponent implements OnInit {
  newPasswordForm: FormGroup;
  errorMessage?: string = '' || undefined ;
  token: string = '';
  showFeedback: boolean = false;
  feedbackMessage: string = '';
  isSuccess: boolean = true;
  buttonText: string = '';
  buttonAction: () => void = () => {};

  constructor(
      private _fb: FormBuilder,
      private _router: Router,
      private _route: ActivatedRoute,
      private _userService: UserService,
    ) {
      this.newPasswordForm = this._fb.group({
        newPassword: ['', [Validators.required, passwordStrengthValidator()]],
        confirmPassword: ['', Validators.required]
      }, { validators: this.passwordsMatchValidator });
  }


  ngOnInit() {
    this._route.queryParams.subscribe(param => {
      this.token = param['token'] || '';
      if (!this.token) {
        this.errorMessage = 'Token is missing in the URL';
      }
    })
  }


  // Validation pour vérifier si les deux mots de passe correspondent
  passwordsMatchValidator(form: AbstractControl): { [key: string]: boolean } | null {
    const newPassword = form.get('newPassword')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;
    return newPassword === confirmPassword ? null : { passwordMismatch: true };
  }

  get newPassword() {
    return this.newPasswordForm.get('newPassword');
  }

  get confirmPassword() {
    return this.newPasswordForm.get('confirmPassword');
  }

  onSubmit(): void {
    if (this.newPasswordForm.valid) {
      const newPassword = this.newPasswordForm.value.newPassword;
      const confirmPassword = this.newPasswordForm.value.confirmPassword;


      this._userService.resetPassword(this.token, newPassword, confirmPassword).subscribe({
        next: () => {
          this.feedbackMessage = "Thank you! Your password has been successfully modified. You can now use it to connect into your favorite app.";
          this.isSuccess = true;
          this.showFeedback = true;
          this.buttonText = 'Back to login';
          this.buttonAction = ()=>{
            this._router.navigate(['user/login']);
          }

        },
        error: (error: HttpErrorResponse) => {
          console.log('Contenu de error.error : ', error.error); // Debug pour l'erreur

          if (error.error && typeof error.error === 'object' && error.error.error) {
            this.feedbackMessage = error.error.error;
          } else {
            this.feedbackMessage = 'An unexpected error occurred. Please try again.';
          }

          this.isSuccess = false;
          this.showFeedback = true;
          this.buttonText = 'Request new password';
          this.buttonAction = () => {
            if (error.error.url) {
              this._userService.requestNewPasswordToken(error.error.url).subscribe({
                next: () => {
                  this.feedbackMessage = "We've just sent you an email with instructions to reset your password. Please check your inbox.";
                  this.isSuccess = true;
                  this.showFeedback = true;
                  this.buttonText = 'Back to login';
                  this.buttonAction = () => {
                    this._router.navigate(['user/login']);
                  };
                },
                error: (requestError: HttpErrorResponse) => {
                  console.error("Error requesting new token: ", requestError);
                  this.feedbackMessage = 'Unable to request a new password reset token. Please try again later.';
                  this.isSuccess = false;
                  this.showFeedback = true;
                  this.buttonText = 'Retry';
                }
              });
            } else {
              this._router.navigate(['/user/request-new-password']);
            }
          };
        }
      });
    }
  }
}
