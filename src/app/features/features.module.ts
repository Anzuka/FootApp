import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FeaturesRoutingModule } from './features-routing.module';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import { InputTextModule } from 'primeng/inputtext';

import { SignUpComponent } from './sign-up/sign-up.component';



@NgModule({
  declarations: [
    HomeComponent,
    LoginComponent,
    SignUpComponent
  ],
  imports: [
    CommonModule,
    FeaturesRoutingModule,
    ButtonModule, 
    DividerModule,
    InputTextModule
  ]
})
export class FeaturesModule { }
