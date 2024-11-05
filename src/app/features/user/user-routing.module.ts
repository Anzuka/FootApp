import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from './login/login.component';
import {SignUpComponent} from './sign-up/sign-up.component';
import {RequestNewPasswordComponent} from './request-new-password/request-new-password.component';
import {ResetPasswordComponent} from './reset-password/reset-password.component';

const routes: Routes = [
  { path: 'user/login', component: LoginComponent},
  { path: 'user/signup', component: SignUpComponent},
  { path: 'user/request-new-password', component: RequestNewPasswordComponent},
  { path: 'user/reset-password', component: ResetPasswordComponent},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
