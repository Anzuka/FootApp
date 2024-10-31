import { Component, Input } from '@angular/core';
import { TournamentCardModel } from './models/tournament.card.model';

@Component({
  selector: 'app-tournament-card',
  templateUrl: './tournament-card.component.html',
  styleUrl: './tournament-card.component.scss'
})
export class TournamentCardComponent {


  @Input({ required: true })
  tournament!:TournamentCardModel;

  constructor(){ }

  getColourClass(tournament: TournamentCardModel): string {
    if(tournament.type.startsWith("KNOCKOUT"))
      return "knockout";

    if(tournament.type.startsWith("CHAMPIONSHIP"))
      return "championship";

    return "complet";
  }

}
