import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ParticipatingTeamsComponent } from './participating.teams.component';
import { SharedModule } from '../../shared/shared.module';



@NgModule({
  declarations: [
    ParticipatingTeamsComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [
    ParticipatingTeamsComponent
  ]
})
export class ParticipatingTeamsModule { }
