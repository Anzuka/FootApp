import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatchRoutingModule } from './match-routing.module';
import {SharedModule} from 'primeng/api';
import { MatchListComponent } from './match.list/match.list.component';


@NgModule({
  declarations: [
    MatchListComponent
  ],
  imports: [
    CommonModule,
    MatchRoutingModule,
    SharedModule
  ]
})
export class MatchModule { }
