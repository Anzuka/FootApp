import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../../auth.service';
import {ActivatedRoute} from '@angular/router';
import {MatchService} from '../tools/match.service';
import {MatchDetailsModel} from '../tools/models/match.details.model';
import {ApiResponse} from '../../user/tools/models/api-response';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
  selector: 'app-match.details',
  templateUrl: './match.details.component.html',
  styleUrl: './match.details.component.scss'
})
export class MatchDetailsComponent implements OnInit {

  match!: MatchDetailsModel;
  id!: number;
  activeTab: string = 'info';
  imgTeamHome: string = 'assets/match/teamHome.jpg';
  imgTeamAway: string = 'assets/match/teamAway.jpg';


  constructor(
    private _route: ActivatedRoute,
    private _matchService: MatchService,
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
        console.log("data : ", data)
        console.log("referee = ", data.refereeDTO )

        this.match = data;
      },
      error: (error: HttpErrorResponse) => {
        console.log(error);
      }
    });
  }

  selectTab(tab: string) {
    this.activeTab = tab;
  }
}
