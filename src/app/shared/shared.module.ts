import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { FeedbackComponent } from './feedback/feedback.component';
import { DetailsDisplayComponent } from './details.display/details.display.component';
import { ChangeStatusComponent } from './change-status/change-status.component';
import {RankingComponent} from './ranking/ranking.component'



@NgModule({
  declarations: [
    FeedbackComponent,
    DetailsDisplayComponent,
    ChangeStatusComponent,
    RankingComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FeedbackComponent,
    DetailsDisplayComponent,
    ChangeStatusComponent,
    RankingComponent
    ]
})
export class SharedModule { }
