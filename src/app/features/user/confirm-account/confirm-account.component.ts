import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { UserService } from '../tools/user.service'; // Service pour gérer les utilisateurs
import { ApiResponse } from '../tools/models/api-response'; // Modèle de la réponse d'API
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-confirm-account',
  templateUrl: './confirm-account.component.html',
  styleUrls: ['./confirm-account.component.scss']
})
export class ConfirmAccountComponent implements OnInit {
  feedbackMessage: string = '';         // Message de retour à afficher
  isFeedbackSuccess!: boolean ;    // Indique si le message est un succès ou une erreur
  showFeedback: boolean = false;        // Contrôle l'affichage du FeedbackComponent
  buttonText: string = '';
  buttonAction: () => void = () => {};

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
            this._displaySucces(response.message, "Login")
            this._navToLogin();
          },
          //ERROR TOKEN EXPIRE
          error: (error: HttpErrorResponse) => {
            this._handleErrors(error);


          }
      });
    } else {
      // Si aucun token n'est présent, afficher un message d'erreur
      this._displayError("No token provided. Please check the confirmation link in the email we sent you", 'Home')
      this._navToHome();
    }
  }


  // region Methods

  private _navToLogin(){
    this.buttonAction = () =>{
      this._router.navigate(['user/login']);
    }
  }

  private _navToHome(){
    this.buttonAction = () =>{
      this._router.navigate(['']);
    }
  }

  private _displayFeedback(isSucces: boolean, message: string, buttonText: string) {
    this.showFeedback = true;
    this.isFeedbackSuccess = isSucces;
    this.feedbackMessage = message;
    this.buttonText = buttonText;
  }

  private _displaySucces(message: string, buttonText: string) {
    this._displayFeedback(true, message, buttonText);
  }

  private _displayError(message: string, buttonText: string) {
    this._displayFeedback(false, message, buttonText);
  }

  private _handleErrors(error: HttpErrorResponse) {

    const errorType: string = error.error.type;
    const errorMessage: string = error.error.message;
    const errorUrl: string = error.error.url;


    console.error("confirmation error : ", error.error);

    if (errorType === 'expiration') {
      this._displayError(errorMessage, 'Request a new Activation link')
      if (errorUrl) {
        this.buttonAction = () => {
          this._userService.requestNewLink(errorUrl).subscribe({
            next: (response: ApiResponse) => {
              console.log("request token data : ",response);
              this._displaySucces(response.message, "Home")
              this._navToHome();
            },
            error: (requestError: HttpErrorResponse) => {
              console.error("Error requesting new token: ", requestError);
              this._displayError(requestError.error, "Home" )
              this._navToHome();
            }
          })
        };
      }
    } else if(errorType === 'activation'){
        this._displayError(errorMessage, 'Login')
        this._navToLogin();
    }
    else if(errorType === 'validity'){
      this._displayError(errorMessage, 'Home')
      this._navToHome();
    }
    else {
      this._displayError("An error occurred while activating your account.", 'Home')
      this._navToHome();

    }
  }
  // endregion


}
