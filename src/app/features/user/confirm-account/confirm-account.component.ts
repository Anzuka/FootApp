import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { UserService } from '../tools/user.service'; // Service pour gérer les utilisateurs
import { ApiResponse } from '../tools/models/api-response'; // Modèle de la réponse d'API
import { HttpErrorResponse } from '@angular/common/http';
import {FeedbackBase} from '../../../shared/feedback/tools/feedback.base';

@Component({
  selector: 'app-confirm-account',
  templateUrl: './confirm-account.component.html',
  styleUrls: ['./confirm-account.component.scss']
})
export class ConfirmAccountComponent implements OnInit {
  feedbackConfirmAccount: FeedbackBase = new FeedbackBase();

  constructor(
    private _route: ActivatedRoute,
    private _userService: UserService,
    private _router: Router
  ) {}

  ngOnInit(): void {
    // Récupère le token depuis l'URL
    const token = this._route.snapshot.queryParamMap.get('token');

    // Si le token est présent, tente de confirmer l'inscription
    if (token) {
      this._userService.confirmAccount(token).subscribe({
          next: (response: ApiResponse) => {
            console.log("response ok : ", response);
            this.feedbackConfirmAccount.displaySuccess(response.message, "Login")
            this._navToLogin();
          },
          //ERROR TOKEN EXPIRE
          error: (error: HttpErrorResponse) => {
            this._handleErrors(error);


          }
      });
    } else {
      // Si aucun token n'est présent, afficher un message d'erreur
      this.feedbackConfirmAccount.displayError("No token provided. Please check the confirmation link in the email we sent you", 'Home')
      this._navToHome();
    }
  }


  // region Methods

  private _navToLogin(){
    this.feedbackConfirmAccount.buttonAction = () =>{
      this._router.navigate(['user/login']);
    }
  }

  private _navToHome(){
    this.feedbackConfirmAccount.buttonAction = () =>{
      this._router.navigate(['']);
    }
  }

  private _handleErrors(error: HttpErrorResponse) {

    const errorType: string = error.error.type;
    const errorMessage: string = error.error.message;
    const errorUrl: string = error.error.url;


    console.error("confirmation error : ", error.error);

    if (errorType === 'expiration') {
      this.feedbackConfirmAccount.displayError(errorMessage, 'Request a new Activation link')
      if (errorUrl) {
        this.feedbackConfirmAccount.buttonAction = () => {
          this._userService.requestNewLink(errorUrl).subscribe({
            next: (response: ApiResponse) => {
              console.log("request token data : ",response);
              this.feedbackConfirmAccount.displaySuccess(response.message, "Home")
              this._navToHome();
            },
            error: (requestError: HttpErrorResponse) => {
              console.error("Error requesting new token: ", requestError);
              this.feedbackConfirmAccount.displayError(requestError.error, "Home" )
              this._navToHome();
            }
          })
        };
      }
    } else if(errorType === 'activation'){
        this.feedbackConfirmAccount.displayError(errorMessage, 'Login')
        this._navToLogin();
    }
    else if(errorType === 'validity'){
      this.feedbackConfirmAccount.displayError(errorMessage, 'Home')
      this._navToHome();
    }
    else {
      this.feedbackConfirmAccount.displayError("An error occurred while activating your account.", 'Home')
      this._navToHome();

    }
  }
  // endregion


}
