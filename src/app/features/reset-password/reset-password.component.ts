import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.scss'
})
export class ResetPasswordComponent {
  resetPasswordForm: FormGroup;
  captchaResolved = false;

  constructor(private fb: FormBuilder, private router: Router) {
    this.resetPasswordForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  get email() {
    return this.resetPasswordForm.get('email')!;
  }

  onSubmit() {
    if (this.resetPasswordForm.valid && this.captchaResolved) {
      const email = this.resetPasswordForm.value.email;
      console.log("Réinitialisation de mot de passe pour:", email);
      // Ici, tu peux ajouter le code pour envoyer la demande au serveur.
    }
  }

  onCaptchaResolved(captchaResponse: string | null) {
    this.captchaResolved = !!captchaResponse; // Met à true si le reCAPTCHA est résolu
  }

  goBack() {
    this.router.navigate(['/login']); // Redirige vers la page de connexion
  }
}
