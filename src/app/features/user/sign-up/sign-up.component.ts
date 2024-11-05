import { Component } from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import { UserService } from '../tools/user.service';
import { UserRegisterModel } from './models/user.register.model';
import { passwordStrengthValidator } from '../tools/validators/password-strength-validator';

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

  constructor(
      private fb: FormBuilder,
      private userService: UserService
  ) {
    // Initialisation du formulaire avec les validations nécessaires
    this.signupForm = this.fb.group({
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
    }, { validators: this.passwordsMatchValidator });
  }

  passwordsMatchValidator(form: AbstractControl): { [key: string]: boolean } | null {
    const password = form.get('password')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { passwordMismatch: true };
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

    this.userService.register(userData).subscribe({
      next: (response) => {
        console.log(response);
        this.feedbackMessage = "Merci ! Vous êtes bien enregistré. Veuillez vérifier votre email pour confirmer votre compte.";
        this.isFeedbackSuccess = true;
        this.showFeedback = true;
      },
      error: (err) => {
        console.error(err);
        this.feedbackMessage = err.error?.message || "Une erreur s'est produite lors de l'enregistrement.";
        this.isFeedbackSuccess = false;
        this.showFeedback = true;
      }
    });
  }

  resetForm() {
    this.signupForm.reset();
    this.showFeedback = false;
  }
}
