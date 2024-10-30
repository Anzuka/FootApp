import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'app-request-new-password',
  templateUrl: './request-new-password.component.html',
  styleUrl: './request-new-password.component.scss'
})
export class RequestNewPasswordComponent {
  requestNewPasswordForm: FormGroup;
  captchaResolved = false;

  constructor(private fb: FormBuilder, private router: Router) {
    this.requestNewPasswordForm = this.fb.group({
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
      // Ici, tu peux ajouter le code pour envoyer la demande au serveur.
    }
  }

  onCaptchaResolved(captchaResponse: string | null) {
    this.captchaResolved = !!captchaResponse; // Met à true si le reCAPTCHA est résolu
  }

}
