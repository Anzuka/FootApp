import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TournamentListComponent } from './tournament.list/tournament.list.component';

import { TournamentRoutingModule } from './tournament-routing.module';
import { TournamentCardComponent } from './tournament-card/tournament-card.component';
import { TournamentInfoComponent } from './tournament-info/tournament-info.component';
import { TournamentFormComponent } from './tournament.form/tournament.form.component';
import { CalendarModule } from 'primeng/calendar';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';

import { MessagesModule } from 'primeng/messages';
import { ParticipatingTeamsModule } from '../participating.teams/participating.teams.module';


@NgModule({
  declarations: [
    TournamentListComponent,
    TournamentCardComponent,
    TournamentInfoComponent,
    TournamentFormComponent,
    ],
  imports: [
    CommonModule,
    TournamentRoutingModule,
    CalendarModule,
    ReactiveFormsModule,
    SharedModule,
    MessagesModule,
    ParticipatingTeamsModule
  ]
})
export class TournamentModule { }
