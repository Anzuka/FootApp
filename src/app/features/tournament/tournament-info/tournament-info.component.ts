import { Component, OnInit } from '@angular/core';
import { TournamentService } from '../tools/services/tournament.service';
import { ActivatedRoute } from '@angular/router';
import { TournamentModel } from '../tools/models/tournament.model';
import { AuthService } from '../../../auth.service';
import { Observable } from 'rxjs';
import { DetailsModel } from '../../../shared/details.display/models/details.model';
import { DatePipe } from '@angular/common';
import { getTournamentStatus, TournamentStatus } from '../tools/enums/tournament-status';
import { HttpErrorResponse } from '@angular/common/http';
import { Message } from 'primeng/api';
import {RankingModel} from '../../../shared/ranking/tools/ranking.model';
import {RankingService} from '../../../shared/ranking/tools/ranking.service';


@Component({
  selector: 'app-tournament-detail',
  templateUrl: './tournament-info.component.html',
  styleUrls: ['./tournament-info.component.scss'],
  providers: [DatePipe]

})
export class TournamentInfoComponent implements OnInit {
  tournamentStatus = TournamentStatus;
  tournament!: TournamentModel;
  isLoggedIn : Observable<boolean>;
  rankingsArray: Array<RankingModel[]> = [];
  displayRanking: boolean = false;
  messages: Message[] = [];


  constructor (
               private route: ActivatedRoute,
               private _tournamentService: TournamentService,
               private _authService: AuthService,
               private datePipe: DatePipe,
               private _rankingService: RankingService
              ) {
                    this.isLoggedIn = _authService.isLoggedIn();
              }

  ngOnInit (): void {
    const id:number = this.route.snapshot.params['id'];
    this._tournamentService.getById(id).subscribe(data => {this.tournament = data;
      this.tournament = data;
      console.log(data);
      // Charger les rankings au moment de l'initialisation
      if (this.tournament) {
        this.loadRankings(this.tournament.id);
      }
    });
  }

  loadRankings(tournamentId: number): void {
    this._rankingService.getAllByTournamentId(tournamentId).subscribe({
      next: (data) => {
        this.sortRankingsByGroup(data);
        console.log("rankings loaded : ", data);
        this.displayRanking = true;
      },
      error: (error) => {
        console.error('Erreur lors du chargement du classement', error);
      }
    });
  }

  sortRankingsByGroup(listOfRankings: RankingModel[]): void {
    // Initialisation de rankingsArray pour être sûr d'avoir des sous-tableaux prêts à l'emploi
    listOfRankings.forEach(r => {
      if (!this.rankingsArray[r.numGroup - 1]) {
        this.rankingsArray[r.numGroup - 1] = []; // Crée un tableau vide pour ce groupe si nécessaire
      }
      this.rankingsArray[r.numGroup - 1].push(r);
    });
  }

  canEdit() : boolean | undefined {

    return this.tournament && this.tournament.organizerId === this._authService.getUserId();
  }

  getDetailstournament(): DetailsModel[] {
    if(this.tournament)
      return this.mapTournamentDetailsToDetailsModel(this.tournament);
    else
    return [];
  }

  updateStatus($tournamentStatusString: string) {
    if($tournamentStatusString){

      const tournamentStatus =  getTournamentStatus($tournamentStatusString);
      if(tournamentStatus && this.tournament){
        const idTournament:number = this.tournament.id;

        this._tournamentService.updateStatus(idTournament, tournamentStatus).subscribe({
          next: () => {
            // Refresh tournament informations
            this._tournamentService.getById(idTournament).subscribe(data => {this.tournament = data;
              console.log(data);
            });
          },
          error:(error: HttpErrorResponse) => {
            console.log("error", error);
            this.messages = [{ severity: 'error', detail: error.error}];

          }
        });
        // this.fromStatus = statusFound ? statusFound : this.fromStatus;
        // this.refreshStatus();
      }

    }
  }

  getTournamentTypeInOrder(): string[]{
    return ['BUILDING', 'PENDING', 'STARTED', 'CLOSED'];
  }

  handleRankingLoaded(event: boolean): void {
    console.log("Ranking component has loaded:", event);
    // Tu peux ajouter des actions spécifiques ici
  }



  // Function to map from TournamentDetailModel to an array of DetailsModel
mapTournamentDetailsToDetailsModel(tournament: TournamentModel): DetailsModel[] {
  return [
    {
      subject: 'START DATE',
      information: this.datePipe.transform(tournament.startDate, 'dd MMMM yyyy, HH:mm'),
    },
    {
      subject: 'END DATE',
      information: this.datePipe.transform(tournament.endDate, 'dd MMMM yyyy, HH:mm'),
    },
    {
      subject: 'PLACE',
      information: tournament.placeName,
    },
    {
      subject: 'TYPE',
      information: tournament.tournamentType,
      url: '/type'
    },
    {
      subject: 'STATUS',
      information: tournament.tournamentStatus.toString(),
    }
  ];
}
}

