import { Component, Input } from '@angular/core';
import { DetailsModel } from './models/details.model';

@Component({
  selector: 'app-details-display',
  templateUrl: './details.display.component.html',
  styleUrl: './details.display.component.scss'
})
export class DetailsDisplayComponent {
  @Input({ required: true })
  headerName?: string;

  @Input({ required: true })
  detailsArray!: DetailsModel[];

  separator: string = "→";
  iconInfo: string = "ℹ️";


}
