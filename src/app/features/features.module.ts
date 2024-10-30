import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FeaturesRoutingModule } from './features-routing.module';
import { HomeComponent } from './home/home.component';


import {UserModule} from './user/user.module';



@NgModule({
  declarations: [
    HomeComponent,

  ],
  imports: [
    CommonModule,
    FeaturesRoutingModule,

    UserModule
  ]
})
export class FeaturesModule { }
