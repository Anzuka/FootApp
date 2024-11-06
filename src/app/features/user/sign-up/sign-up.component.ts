import { Component } from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import { UserService } from '../tools/user.service';
import { UserRegisterModel } from './models/user.register.model';
import { passwordStrengthValidator } from '../tools/validators/password-strength-validator';
import {HttpErrorResponse} from '@angular/common/http';
import {ApiResponse} from '../tools/models/api-response';
import {Router} from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss'
})
export class SignUpComponent {
  signupForm: FormGroup;
  feedbackMessage: string = '';
  isFeedbackSuccess: boolean = true;
  showFeedback: boolean = false;
  buttonText: string = '';
  buttonAction: () => void = () => {
  };

  constructor(
    private _fb: FormBuilder,
    private _userService: UserService,
    private _router: Router
  ) {
    // Initialisation du formulaire avec les validations nécessaires
    this.signupForm = this._fb.group({
      username: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      password: ['', [Validators.required, passwordStrengthValidator()]],
      confirmPassword: ['', Validators.required],
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      birthdate: [null, Validators.required], // Format de date géré par le champ date
      phoneNumber: ['', Validators.pattern(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/)],
      street: [''],
      city: [''],
      zip: ['', Validators.required],
      state: [''],
      country: [''],
    }, {validators: this.passwordsMatchValidator});
  }

  passwordsMatchValidator(form: AbstractControl): { [key: string]: boolean } | null {
    const password = form.get('password')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;
    return password === confirmPassword ? null : {passwordMismatch: true};
  }

  onSubmit() {
    if (this.signupForm.invalid) {
      this.feedbackMessage = 'Formulaire invalide. Veuillez corriger les erreurs et réessayer.';
      this.isFeedbackSuccess = false;
      this.showFeedback = true;
      return;
    }

    // Récupération des données du formulaire
    const userData: UserRegisterModel = this.signupForm.value;

    this._userService.register(userData).subscribe({
      next: (response: ApiResponse) => {
        console.log(response);
        this.feedbackMessage = response.message;
        this.isFeedbackSuccess = true;
        this.showFeedback = true;
        this.buttonText = 'Back to login';
        this.buttonAction = () => {
          this._router.navigate(['user/login']);
        };
      },
      error: (err: HttpErrorResponse) => {
        console.log('Contenu de error.error : ', err.error); // Debug pour l'erreur

        if (err.error && typeof err.error === 'object' && err.error.error) {
          this.feedbackMessage = err.error.error;
        } else if (err.error && typeof err.error === 'object' && err.error.errors) {
          console.log("error valid = ", err.error.errors);
          this.feedbackMessage = err.error.errors[0];
        } else {
          this.feedbackMessage = "Une erreur s'est produite lors de l'enregistrement.";
        }
        this.isFeedbackSuccess = false;
        this.showFeedback = true;
        this.buttonText = 'Back to form';
        this.buttonAction = () => {
          this.showFeedback = false;
        };
      }
    });
  }

  //resetForm() {
  // this.signupForm.reset();
  // this.showFeedback = false;
  //}
}
