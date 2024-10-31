import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {UserService} from '../tools/user.service';
import {passwordStrengthValidator} from '../tools/validators/password-strength-validator';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.scss'
})
export class ResetPasswordComponent implements OnInit {
  newPasswordForm: FormGroup;
  errorMessage?: string = '' || undefined ;
  token: string = '';
  showFeedback: boolean = false;
  feedbackMessage: string = '';
  isSuccess: boolean = true;

  constructor(
      private _fb: FormBuilder,
      private _router: Router,
      private _route: ActivatedRoute,
      private _userService: UserService,
    ) {
      this.newPasswordForm = this._fb.group({
        newPassword: ['', [Validators.required, passwordStrengthValidator()]],
        confirmPassword: ['', Validators.required]
      }, { validators: this.passwordsMatchValidator });
  }


  ngOnInit() {
    this._route.queryParams.subscribe(param => {
      this.token = param['token'] || '';
      if (!this.token) {
        this.errorMessage = 'Token is missing in the URL';
      }
    })
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
      const confirmPassword = this.newPasswordForm.value.confirmPassword;
      //console.log("New Password:", newPassword);
      //console.log("Confirm Password:", confirmPassword);

      this._userService.resetPassword(this.token, newPassword, confirmPassword).subscribe({
        next: () => {
          this.feedbackMessage = "Thank you! Your password has been successfully modified. You can now use it to connect into your favorite app.";
          this.isSuccess = true;
          this.showFeedback = true;
          //console.log(result)
          //alert("Your password has been updated successfully.");
          //this._router.navigate(["/user/login"]);
        },
        error: (data) => {
          this.feedbackMessage = data.error?.error || 'An unexpected error occurred. Please try again.';
          this.isSuccess = false;
          this.showFeedback = true;
          //console.log(result.error)
          //this.errorMessage = error.error || 'Password reset failed. Please try again.';
        }
      });

      //this._router.navigate(['/user/login']); // Redirige vers la page de connexion après le succès
    }
  }

}
