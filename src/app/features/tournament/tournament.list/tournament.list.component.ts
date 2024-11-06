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

  constructor(private _tournamentService: TournamentService) { }

  ngOnInit (): void {
    this.loadTournaments();
  }

  loadTournaments(): void {
    this._tournamentService.getAllOrganizeTournament().subscribe((data: TournamentModel[]) => {
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
