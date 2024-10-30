import { Component } from '@angular/core';
import { TournamentCardModel } from '../tournament-card/models/tournament.card.model';
import { TournamentType } from '../tools/enums/tournament-type';
import { TournamentService } from '../tools/services/tournament.service';
import { TournamentModel } from '../tools/models/tournament.model';
import { TournamentStatus } from '../tools/enums/tournament-status';

@Component({
  selector: 'app-tournament.list',
  templateUrl: './tournament.list.component.html',
  styleUrl: './tournament.list.component.scss'
})
export class TournamentListComponent {

  tournaments!: TournamentCardModel[];
  // tournaments: TournamentCardModel[] = [
  //   {
  //     id: 1,
  //     name: 'Tournoi du week end',
  //     type: TournamentType.KNOCKOUT_8,
  //     img: 'assets/tournament/knockout-tournament-image.png',
  //     status: TournamentStatus.PENDING
  //   },
  //   {
  //     id: 2,
  //     name: 'Ranking 8 Tournament',
  //     type: TournamentType.CHAMPIONSHIP_8,
  //     img: 'assets/tournament/championship-tournament-image.png',
  //     status: TournamentStatus.BUILDING
  //   },
  //   {
  //     id: 3,
  //     name: 'Championship BXL',
  //     type: TournamentType.COPA_AMERICA_16,
  //     img: 'assets/tournament/championship-knockout-tournament-image.png',
  //     status: TournamentStatus.CLOSED
  //   }
 // ];

  constructor(private _tournamentService: TournamentService) { }

  ngOnInit (): void {
    this.loadTournaments();
  }

  loadTournaments(): void {
    this._tournamentService.getAll().subscribe((data: TournamentModel[]) => {
      console.log(data);
      this.tournaments = data.map(tournament => this.transformToCardModel(tournament));
    });
  }

  private transformToCardModel(tournament: TournamentModel): TournamentCardModel {
    return {
      id: tournament.id,
      name: tournament.title,
      type: tournament.tournamentType,
      img: this.getImageForType(tournament.tournamentType),
      status: tournament.tournamentStatus
    }
  }

  private getImageForType(type: TournamentType): string {

    if(type.startsWith("KNOCKOUT"))
      return "assets/tournament/knockout-tournament-image.png";

    if(type.startsWith("CHAMPIONSHIP"))
      return "assets/tournament/championship-tournament-image.png";

    return "assets/tournament/championship-knockout-tournament-image.png";

  }

}
