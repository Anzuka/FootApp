import { Component, OnInit } from '@angular/core';
import { TournamentType } from '../tools/enums/tournament-type';
import { TournamentStatus } from '../tools/enums/tournament-status';
import { TournamentService } from '../tools/services/tournament.service';
import { ActivatedRoute } from '@angular/router';
import { TournamentModel } from '../tools/models/tournament.model';

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

  tournament?: TournamentModel;


  constructor (private route: ActivatedRoute, private _tournamentService: TournamentService) { 

  }

  ngOnInit (): void {
    const id:number = this.route.snapshot.params['id'];
    this._tournamentService.getById(id).subscribe(data => {this.tournament = data;
      console.log(data);
    });
  }
}