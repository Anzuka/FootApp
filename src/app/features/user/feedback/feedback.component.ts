import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrl: './feedback.component.scss'
})
export class FeedbackComponent {
  @Input() message: string = '';
  @Input() isSuccess: boolean = true;

  get feedbackClass(): string {
    return this.isSuccess ? 'feedback-success' : 'feedback-error';
  }
}
