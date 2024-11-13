import { NgModule } from '@angular/core';

import { FeaturesRoutingModule } from './features-routing.module';
import { HomeComponent } from './home/home.component';
import {UserModule} from './user/user.module';
import {SharedModule} from '../shared/shared.module';
//import { RankingComponent } from './ranking/ranking.component';




@NgModule({
  declarations: [
    HomeComponent,
    //RankingComponent
  ],
  imports: [
    FeaturesRoutingModule,
    SharedModule,
    UserModule  ]
})
export class FeaturesModule { }
