import {Component, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../auth.service';
import {FeedbackBase} from '../../../shared/feedback/tools/feedback.base';
import {HttpErrorResponse} from '@angular/common/http';
import {UserService} from '../tools/user.service';
import {ApiResponse} from '../tools/models/api-response';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  feedbackLogin: FeedbackBase = new FeedbackBase();


  constructor(
    private _fb: FormBuilder,
    private _authService: AuthService,
    private _userService: UserService,
    private _router: Router
  ) {
    this.loginForm = this._fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  ngOnInit() {
    if (this._authService.isConnected()){
      this.feedbackLogin.displayError("You are already logged in!!!", "Home")
      this.feedbackLogin.buttonAction = ()=>{
        this._router.navigate(['']);
      }
    }
  }

  login() {
    if (this.loginForm.valid) {
      const { username, password } = this.loginForm.value;
      this._authService.login(username, password).subscribe({
        next: () => {
          this._router.navigate(['/']);
        },
        error: (error: HttpErrorResponse) => {
          console.error("error: ",error);
          if(error.error.notEnabledError){
            console.log("Je suis ici: ", error.error.confirmUrl);
            this.feedbackLogin.displayError(error.error.notEnabledError, 'Request new mail');
            this.feedbackLogin.buttonAction = () => {
              this._userService.requestNewLink(error.error.confirmUrl).subscribe({
                next: (data: ApiResponse) => {
                  console.log("request token data : ",data);
                  this.feedbackLogin.displaySuccess(data.message, 'Back');
                  this.feedbackLogin.buttonAction = () => this.feedbackLogin.showFeedback = false;
                },
                error: (err: HttpErrorResponse) => {
                  console.log("error : ", err);
                  this.feedbackLogin.displayError(err.error.error, 'Back');
                }
              })
            }

          }else if (error.error) {
            this.feedbackLogin.displayError(error.error.error, 'Back');
            this.feedbackLogin.buttonAction = () => {
              console.log("test");
              this.feedbackLogin.showFeedback = false;
            }
            console.log("buttonAction defined");

          }else {
            this.feedbackLogin.displayError('Erreur de connexion, veuillez réessayer.', 'Back');
            this.feedbackLogin.buttonAction = () => this.feedbackLogin.showFeedback = false;
          }
        }
      });
    }
  }
}
