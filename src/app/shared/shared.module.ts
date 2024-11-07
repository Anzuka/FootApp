import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { FeedbackComponent } from './feedback/feedback.component';
import { DetailsDisplayComponent } from './details.display/details.display.component';



@NgModule({
  declarations: [
    FeedbackComponent, 
    DetailsDisplayComponent
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
    DetailsDisplayComponent
    ]
})
export class SharedModule { }
