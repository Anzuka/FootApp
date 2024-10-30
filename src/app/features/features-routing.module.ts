import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import {RequestNewPasswordComponent} from './request-new-password/request-new-password.component';
import {RequestNewPasswordConfirmationComponent} from './request-new-password-confirmation/request-new-password-confirmation.component';
import {ResetPasswordComponent} from './reset-password/reset-password.component';

const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'login', component: LoginComponent},
    { path: 'signup', component: SignUpComponent},
    { path: 'request-new-password', component: RequestNewPasswordComponent},
    { path: 'request-new-password-confirmation', component: RequestNewPasswordConfirmationComponent},
    { path: 'reset-password', component: ResetPasswordComponent},
    { path: 'tournament', loadChildren: () => import('./tournament/tournament.module').then(m => m.TournamentModule)}


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FeaturesRoutingModule { }
