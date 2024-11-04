import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrl: './feedback.component.scss'
})
export class FeedbackComponent {
  @Input() message: string = '';
  @Input() isSuccess: boolean = true;
  @Input() buttonText: string = '';
  @Output() buttonClicked = new EventEmitter<void>();  // Déclare l'événement

  onButtonClick() {
    this.buttonClicked.emit();  // Émet l'événement quand le bouton est cliqué
  }
}
