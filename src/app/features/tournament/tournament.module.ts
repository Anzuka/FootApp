import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TournamentListComponent } from './tournament.list/tournament.list.component';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { TournamentRoutingModule } from './tournament-routing.module';
import { TournamentCardComponent } from './tournament-card/tournament-card.component';
import { TournamentInfoComponent } from './tournament-info/tournament-info.component';
import { TournamentFormComponent } from './tournament.form/tournament.form.component';
import { CalendarModule } from 'primeng/calendar';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';



@NgModule({
  declarations: [
    TournamentListComponent,
    TournamentCardComponent,
    TournamentInfoComponent,
    TournamentFormComponent
  ],
  imports: [
    CommonModule,
    CardModule,
    ButtonModule,
    TournamentRoutingModule,
    CalendarModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class TournamentModule { }
