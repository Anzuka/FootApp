import { Component, Input, OnInit } from '@angular/core';
import { ParticipatingTeamModel } from './tools/models/participating.team.model';
import { DetailsModel } from '../../shared/details.display/models/details.model';
import { ParticipatingTeamService } from './tools/services/participating.team.service.';

@Component({
  selector: 'app-participating-teams',
  templateUrl: './participating.teams.component.html',
  styleUrl: './participating.teams.component.scss'
})
export class ParticipatingTeamsComponent implements OnInit {


  @Input({required: true})
  tournamentId!: number;
  participatingTeams?: ParticipatingTeamModel[];

  constructor(private _participatingTeamService: ParticipatingTeamService){

  }

  ngOnInit(){
    
    this._participatingTeamService.getByTournament(this.tournamentId).subscribe({
      next: (data) => this.participatingTeams = data

    });
  }

  getDetailsParticipatingTeams(): DetailsModel[] {
      if(this.participatingTeams)
        return mapParticipatingTeamsDetailsToDetailsModel(this.participatingTeams);
      else
      return [];
  }
}

function mapParticipatingTeamsDetailsToDetailsModel(participatingTeams: ParticipatingTeamModel[]): DetailsModel[] {

  let details: DetailsModel[] = [];
  
  for (const element of participatingTeams) {
    const detail: DetailsModel = {
      subject: element.team.name,
      information: element.subscriptionStatus.toString()
    }
    details.push(detail);
  }

  return details;
}


