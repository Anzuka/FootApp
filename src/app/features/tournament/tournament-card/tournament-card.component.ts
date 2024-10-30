import { Component, Input } from '@angular/core';
import { TournamentListModel } from './models/tournament.list.model';

@Component({
  selector: 'app-tournament-card',
  templateUrl: './tournament-card.component.html',
  styleUrl: './tournament-card.component.scss'
})
export class TournamentCardComponent {


  @Input({ required: true })
  tournament!:TournamentListModel;

  constructor(){ }

  getColourClass(tournament: TournamentListModel): string {
    if(tournament.type.startsWith("KNOCKOUT"))
      return "knockout";

    if(tournament.type.startsWith("CHAMPIONSHIP"))
      return "championship";

    return "complet";
  }

}
