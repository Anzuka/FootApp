import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatchRoutingModule } from './match-routing.module';
import { MatchListComponent } from './match.list/match.list.component';
import { MatchDetailsComponent } from './match.details/match.details.component';
import {SharedModule} from '../../shared/shared.module';


@NgModule({
  declarations: [
    MatchListComponent,
    MatchDetailsComponent,
  ],
  imports: [
    CommonModule,
    MatchRoutingModule,
    SharedModule,
  ]
})
export class MatchModule { }
