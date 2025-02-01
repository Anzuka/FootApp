import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module'

import { UserRoutingModule } from './user-routing.module';
import {LoginComponent} from './login/login.component';
import {SignUpComponent} from './sign-up/sign-up.component';
import {RequestNewPasswordComponent} from './request-new-password/request-new-password.component';
import {ResetPasswordComponent} from './reset-password/reset-password.component';
import {PasswordModule} from 'primeng/password';
import {CalendarModule} from 'primeng/calendar';
import {ButtonModule} from 'primeng/button';
import {DividerModule} from 'primeng/divider';
import {InputTextModule} from 'primeng/inputtext';
import { ConfirmAccountComponent } from './confirm-account/confirm-account.component';


@NgModule({
  declarations: [
    LoginComponent,
    SignUpComponent,
    RequestNewPasswordComponent,
    ResetPasswordComponent,
    ConfirmAccountComponent,
  ],
  imports: [
    UserRoutingModule,
    SharedModule,
    ButtonModule,
    DividerModule,
    InputTextModule,
    PasswordModule,
    CalendarModule,
  ]
})
export class UserModule { }
