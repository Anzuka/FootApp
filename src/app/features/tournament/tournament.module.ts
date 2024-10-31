import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TournamentListComponent } from './tournament.list/tournament.list.component';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { TournamentRoutingModule } from './tournament-routing.module';
import { TournamentCardComponent } from './tournament-card/tournament-card.component';
import { TournamentInfoComponent } from './tournament-info/tournament-info.component';



@NgModule({
  declarations: [
    TournamentListComponent,
    TournamentCardComponent,
    TournamentInfoComponent
  ],
  imports: [
    CommonModule,
    CardModule,
    ButtonModule,
    TournamentRoutingModule,
  ]
})
export class TournamentModule { }
