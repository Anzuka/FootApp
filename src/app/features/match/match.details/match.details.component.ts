import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {MatchService} from '../tools/match.service';
import {MatchDetailsModel} from '../tools/models/match.details.model';
import {HttpErrorResponse} from '@angular/common/http';
import {RankingService} from '../../ranking/tools/ranking.service';
import {RankingModel} from '../../ranking/tools/ranking.model';

@Component({
  selector: 'app-match.details',
  templateUrl: './match.details.component.html',
  styleUrl: './match.details.component.scss'
})
export class MatchDetailsComponent implements OnInit {

  match!: MatchDetailsModel;
  rankings: RankingModel[] = [];
  displayRanking: boolean = false;
  id!: number;
  activeTab: string = 'info';
  imgTeamHome: string = 'assets/match/teamHome.jpg';
  imgTeamAway: string = 'assets/match/teamAway.jpg';



  constructor(
    private _route: ActivatedRoute,
    private _matchService: MatchService,
    private _rankingService: RankingService,
  ) {
  }

  ngOnInit() {
    this._route.params.subscribe(params => {
      this.id = params['id'];
      this._loadMatch();
    });

  }

  private _loadMatch(): void {
    this._matchService.getMatchDetails(this.id).subscribe({
      next: (data: MatchDetailsModel) => {
        console.log("data : ", data);
        this.match = data;
        if(data.tournamentSmallDetailsDTO){
          this.match.tournamentSmallDetailsDTO = data.tournamentSmallDetailsDTO
          console.log("match.TournamentSmallDetailsDTO == ok ok : ", this.match.tournamentSmallDetailsDTO)

          let rankingData: any;
          this._rankingService.getAllByTournamentIdAndTeam(this.match.tournamentSmallDetailsDTO.id, this.match.teamHome.id).subscribe({
            next:(data)=>{
              console.log("ranking : ", data);

            },
            error: (error:HttpErrorResponse)=>{
              console.error("errorRanking : ", error);
            }
          })

        }
      },
      error: (error: HttpErrorResponse) => {
        console.log(error);
      }
    });
  }

  private _loadRanking(tournamentId: number, teamId: number) {
    this._rankingService.getAllByTournamentIdAndTeam(tournamentId, teamId).subscribe({
      next: (data: RankingModel[]) => {
        this.rankings = data;
        this.displayRanking = true;
        console.log("Ranking loaded: ", this.rankings);
      },
      error: (err: HttpErrorResponse) => console.error("Error loading rankings", err)
    });
  }

  selectTab(tab: string) {
    this.activeTab = tab;
    if (tab === 'ranking') {
      this._loadRanking(this.match.tournamentSmallDetailsDTO.id, this.match.teamHome.id);
    }
    // Changer l'onglet actif
  }

  // Méthode pour gérer l'événement reçu depuis RankingComponent
  handleRankingLoaded(event: boolean) {
    console.log("Ranking component has loaded:", event);
    // Effectuer des actions si nécessaire, comme afficher un message ou modifier un état
  }


}
