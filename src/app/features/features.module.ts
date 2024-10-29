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
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { RecaptchaModule } from 'ng-recaptcha';
import { ResetPasswordConfirmationComponent } from './reset-password-confirmation/reset-password-confirmation.component';



@NgModule({
  declarations: [
    HomeComponent,
    LoginComponent,
    SignUpComponent,
    ResetPasswordComponent,
    ResetPasswordConfirmationComponent
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
