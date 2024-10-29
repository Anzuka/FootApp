import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FeaturesRoutingModule } from './features-routing.module';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import { InputTextModule } from 'primeng/inputtext';

import { SignUpComponent } from './sign-up/sign-up.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PasswordModule } from 'primeng/password';
import { CalendarModule } from 'primeng/calendar';
import { RequestNewPasswordComponent } from './request-new-password/request-new-password.component';
import { RecaptchaModule } from 'ng-recaptcha';
import { RequestNewPasswordConfirmationComponent } from './request-new-password-confirmation/request-new-password-confirmation.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';



@NgModule({
  declarations: [
    HomeComponent,
    LoginComponent,
    SignUpComponent,
    RequestNewPasswordComponent,
    RequestNewPasswordConfirmationComponent,
    ResetPasswordComponent
  ],
  imports: [
    CommonModule,
    FeaturesRoutingModule,
    ButtonModule,
    DividerModule,
    InputTextModule,
    FormsModule,
    ReactiveFormsModule,
    PasswordModule,
    CalendarModule,
    RecaptchaModule
  ]
})
export class FeaturesModule { }
