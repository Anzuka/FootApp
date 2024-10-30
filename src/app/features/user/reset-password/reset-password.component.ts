import { Component } from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.scss'
})
export class ResetPasswordComponent {
  newPasswordForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) {
    this.newPasswordForm = this.fb.group({
      newPassword: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', Validators.required]
    }, { validators: this.passwordsMatchValidator });
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
      console.log("Setting new password:", newPassword);

      // Logique pour soumettre le mot de passe au serveur ici...

      this.router.navigate(['/user/login']); // Redirige vers la page de connexion après le succès
    }
  }

}
