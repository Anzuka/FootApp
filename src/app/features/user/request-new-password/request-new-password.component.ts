import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {UserService} from '../tools/user.service';
import {HttpErrorResponse} from '@angular/common/http';
import {FeedbackBase} from '../../../shared/feedback/tools/feedback.base';
import {ApiResponse} from '../tools/models/api-response';
import {AuthService} from '../../../auth.service';


@Component({
  selector: 'app-request-new-password',
  templateUrl: './request-new-password.component.html',
  styleUrl: './request-new-password.component.scss'
})
export class RequestNewPasswordComponent implements OnInit{
  requestNewPasswordForm: FormGroup;
  newPasswordFeedback: FeedbackBase = new FeedbackBase();



  constructor(
    private _fb: FormBuilder,
    private _router: Router,
    private _userService: UserService,
    private _authService: AuthService
  ) {
    this.requestNewPasswordForm = this._fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  get email() {
    return this.requestNewPasswordForm.get('email')!;
  }

  ngOnInit() {
    if (this._authService.isConnected()){
      let errorMessage: string = "You are already logged in! !! Access forbidden! To change your password, go to : “settings” -> “security” -> “change my password”. "
      this.newPasswordFeedback.displayError(errorMessage, "Home");
      this.newPasswordFeedback.buttonAction = () =>{
        this._router.navigate(['']);
      }
    }
  }

  onSubmit() {
    if (this.requestNewPasswordForm.valid) {
      const email = this.requestNewPasswordForm.value.email;
      console.log("Réinitialisation de mot de passe pour:", email);

      this._userService.requestPassword(email).subscribe({
        next: (result: ApiResponse) => {
          this.newPasswordFeedback.displaySuccess(result.message, 'Login')
          this.newPasswordFeedback.buttonAction = () => {
            this._router.navigate(['user/login']);
          }
        },
        error: (error: HttpErrorResponse) => {
          console.error('Erreur de request password : ', error);
          console.log('Contenu de error.error : ', error.error); // Ajoute cette ligne

          // Assigne le message d'erreur correctement
          let errorMessage: string = error.error.error? error.error.error : null;
          this.newPasswordFeedback.displayError(errorMessage, 'Retry');
          this.newPasswordFeedback.buttonAction = () => {
            this.newPasswordFeedback.showFeedback = false;
          }
        }
      })
    }
  }

}
