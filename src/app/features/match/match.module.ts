import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatchRoutingModule } from './match-routing.module';
import {SharedModule} from 'primeng/api';
import { MatchListComponent } from './match.list/match.list.component';
import { MatchDetailsComponent } from './match.details/match.details.component';
import {RankingComponent} from '../ranking/ranking.component';


@NgModule({
  declarations: [
    MatchListComponent,
    MatchDetailsComponent,
    RankingComponent,
  ],
  imports: [
    CommonModule,
    MatchRoutingModule,
    SharedModule,
  ]
})
export class MatchModule { }
