import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import {LoginComponent} from './login/login.component';
import {SignUpComponent} from './sign-up/sign-up.component';
import {RequestNewPasswordComponent} from './request-new-password/request-new-password.component';
import {RequestNewPasswordConfirmationComponent} from './request-new-password-confirmation/request-new-password-confirmation.component';
import {ResetPasswordComponent} from './reset-password/reset-password.component';
import {RecaptchaModule} from 'ng-recaptcha';
import {PasswordModule} from 'primeng/password';
import {CalendarModule} from 'primeng/calendar';
import {ButtonModule} from 'primeng/button';
import {DividerModule} from 'primeng/divider';
import {InputTextModule} from 'primeng/inputtext';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';


@NgModule({
  declarations: [
    LoginComponent,
    SignUpComponent,
    RequestNewPasswordComponent,
    RequestNewPasswordConfirmationComponent,
    ResetPasswordComponent,
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    ButtonModule,
    DividerModule,
    InputTextModule,
    FormsModule,
    ReactiveFormsModule,
    PasswordModule,
    CalendarModule,
    RecaptchaModule,
  ]
})
export class UserModule { }
