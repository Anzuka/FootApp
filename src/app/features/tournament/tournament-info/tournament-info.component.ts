import { Component, OnInit } from '@angular/core';
import { TournamentService } from '../tools/services/tournament.service';
import { ActivatedRoute } from '@angular/router';
import { TournamentModel } from '../tools/models/tournament.model';
import { AuthService } from '../../../auth.service';
import { Observable } from 'rxjs';
import { DetailsModel } from '../../../shared/details.display/models/details.model';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-tournament-detail',
  templateUrl: './tournament-info.component.html',
  styleUrls: ['./tournament-info.component.scss'],
  providers: [DatePipe]

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



  constructor (private route: ActivatedRoute, private _tournamentService: TournamentService, private _authService: AuthService, private datePipe: DatePipe) { 
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

  getDetailstournament(): DetailsModel[] {
    if(this.tournament)
      return this.mapTournamentDetailsToDetailsModel(this.tournament);
    else
    return [];
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

