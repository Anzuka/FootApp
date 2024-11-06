import { Component, OnInit } from '@angular/core';
import { TournamentType } from '../tools/enums/tournament-type';
import { TournamentStatus } from '../tools/enums/tournament-status';
import { TournamentService } from '../tools/services/tournament.service';
import { ActivatedRoute } from '@angular/router';
import { TournamentModel } from '../tools/models/tournament.model';
import { AuthService } from '../../../auth.service';
import { Observable } from 'rxjs';

interface Address {
  street: string;
  city: string;
  zip: string;
  state: string;
  country: string;
}

interface TournamentDetailModel {
  title: string;
  startDate: Date;
  endDate: Date;
  placeName: string;
  address: Address;
  tournamentType: TournamentType;
  tournamentStatus: TournamentStatus;
}

@Component({
  selector: 'app-tournament-detail',
  templateUrl: './tournament-info.component.html',
  styleUrls: ['./tournament-info.component.scss']
})
export class TournamentInfoComponent implements OnInit {
changeTournamentStatus() {
throw new Error('Method not implemented.');
}
deleteTournament() {
throw new Error('Method not implemented.');
}

  tournament?: TournamentModel;
  isLoggedIn : Observable<boolean>;



  constructor (private route: ActivatedRoute, private _tournamentService: TournamentService, private _authService: AuthService) { 
    this.isLoggedIn = _authService.isLoggedIn();
  }

  ngOnInit (): void {
    const id:number = this.route.snapshot.params['id'];
    this._tournamentService.getById(id).subscribe(data => {this.tournament = data;
      console.log(data);
    });
  }

  canEdit() : boolean | undefined {
    
    return this.tournament && this.tournament.organizerId === this._authService.getUserId();
  }
}