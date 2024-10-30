import { Component } from '@angular/core';
import { TournamentListModel } from '../tournament-card/models/tournament.list.model';
import { TournamentType } from '../tools/enums/tournament-type';

@Component({
  selector: 'app-tournament.list',
  templateUrl: './tournament.list.component.html',
  styleUrl: './tournament.list.component.scss'
})
export class TournamentListComponent {
  tournaments: TournamentListModel[] = [
    {
      id: 1,
      name: 'Tournoi du week end',
      type: TournamentType.KNOCKOUT_8,
      img: 'assets/tournament/knockout-tournament-image.png',
      status: 'Pending'
    },
    {
      id: 2,
      name: 'Ranking 8 Tournament',
      type: TournamentType.CHAMPIONSHIP_8,
      img: 'assets/tournament/championship-tournament-image.png',
      status: 'In Progress'
    },
    {
      id: 3,
      name: 'Championship BXL',
      type: TournamentType.COPA_AMERICA_16,
      img: 'assets/tournament/championship-knockout-tournament-image.png',
      status: 'Closed'
    }
  ];

}
