import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {UserService} from '../tools/user.service';
import {passwordStrengthValidator} from '../tools/validators/password-strength-validator';
import {HttpErrorResponse} from '@angular/common/http';
import {AuthService} from '../../../auth.service';
import {FeedbackBase} from '../../../shared/feedback/tools/feedback.base';
import {ApiResponse} from '../tools/models/api-response';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.scss'
})
export class ResetPasswordComponent implements OnInit {
  newPasswordForm: FormGroup;
  errorMessage?: string = '' || undefined ;
  token: string = '';
  resetFeedback: FeedbackBase = new FeedbackBase();


  constructor(
    private _fb: FormBuilder,
    private _router: Router,
    private _route: ActivatedRoute,
    private _userService: UserService,
    private _authService: AuthService,
  ) {
    this.newPasswordForm = this._fb.group({
      newPassword: ['', [Validators.required, passwordStrengthValidator()]],
      confirmPassword: ['', Validators.required]
    }, { validators: this.passwordsMatchValidator });
  }


  ngOnInit() {

    if(this._authService.isConnected()){
      let errorMessage: string = "You are already logged in! !! Access forbidden! To change your password, go to : “settings” -> “security” -> “change my password”. "
      this.resetFeedback.displayError(errorMessage, "Home");
      this.resetFeedback.buttonAction = () => { this._navToHome() }
    }

    this._route.queryParams.subscribe(param => {
      this.token = param['token'] || '';

      if (!this.token) {
        this.resetFeedback.displayError('Token is missing in the URL', 'Home')
        this.resetFeedback.buttonAction = () => { this._navToHome() }
      }
    });

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
      const newPassword = this.newPasswordForm.controls['newPassword'].value;
      const confirmPassword = this.newPasswordForm.controls['confirmPassword'].value;


      this._userService.resetPassword(this.token, newPassword, confirmPassword).subscribe({
        next: (data: ApiResponse) => {
          this.resetFeedback.displaySuccess(data.message, 'login');
          this.resetFeedback.buttonAction = () => { this._navToLogin() }

        },
        error: (error: HttpErrorResponse) : void => {
          this._handelError(error);
        }
      });
    }

  }

  private _handelError(error: HttpErrorResponse) : void{
    console.log('Contenu de error.error : ', error.error);
    if (error.error.url){
      this.resetFeedback.displayError(error.error.error, 'Request new password');
      this.resetFeedback.buttonAction = () => {
        this._userService.requestNewLink(error.error.url).subscribe({
          next: (data: ApiResponse) => {
            this.resetFeedback.displaySuccess(data.message, 'login');
            this.resetFeedback.buttonAction = () => { this._navToLogin() }
          },
          error: (error: HttpErrorResponse) => {
            this.resetFeedback.displayError(error.error.error, 'Request new password');
            this.resetFeedback.buttonAction = () => this._navToRequestNewPassword();
          }
        })
      }
    } else if(error.error){
        this.resetFeedback.displayError(error.error, 'Request new password');
        this.resetFeedback.buttonAction = () => this._navToRequestNewPassword();
    } else {
        const feedBackMessage: string = "An unexpected error occurred. Please try again.";
        this.resetFeedback.displayError(feedBackMessage, 'Request new password');
        this.resetFeedback.buttonAction = () => this._navToRequestNewPassword();
    }
  }

  private _nav(url: string): void{
    this._router.navigate([url]);
  }

  private _navToLogin(): void {
    this._nav('/user/login');
  }

  private _navToHome(): void{
    this._nav('');
  }

  private _navToRequestNewPassword(): void{
    this._nav('/user/request-new-password');
  }

}


