import { Component } from '@angular/core';
import { TournamentModel } from '../tools/models/tournament.model';
import { TournamentType } from '../tools/enums/tournament-type';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TournamentService } from '../tools/services/tournament.service';
import { TournamentCreateModel } from '../tools/models/tournament.create.model';
import { TournamentStatus } from '../tools/enums/tournament-status';

@Component({
  selector: 'app-tournament.form',
  templateUrl: './tournament.form.component.html',
  styleUrl: './tournament.form.component.scss'
})

export class TournamentFormComponent {
  tournamentForm!: FormGroup;
  tournamentTypes = Object.values(TournamentType); 

  constructor(private fb: FormBuilder, private _serviceTournament: TournamentService){}
  
  ngOnInit(){
    this.tournamentForm = this.fb.group({
      title: [null, Validators.required],
      startDate: [null],
      endDate: [null],
      placeName: [null, Validators.required],
      address: this.fb.group({
        street: [null],
        city: [null],
        zip: [null],
        state: [null],
        country: [null]
      }),
      tournamentType: [null, Validators.required],
    });
  }


  get addressForm(): FormGroup{
    return this.tournamentForm.get('address') as FormGroup;
  }

  onSubmit() {
    if(this.tournamentForm.valid){
      let value: TournamentModel = this.tournamentForm.value;
      console.log(value);
      this._serviceTournament.createOne(mapToTournamentCreateModel(value)).subscribe();
      
    }else{
      console.log('Form is invalid');
      console.log(this.tournamentForm);
    }
  }

  get adresseForm(): FormGroup{
    return this.tournamentForm.get('address') as FormGroup;
  }
}

function mapToTournamentCreateModel(value: TournamentModel): TournamentCreateModel {
  return {
    'title': value.title,
    'startDate': value.startDate,
    'endDate': value.endDate,
    'address': value.address!,
    'placeName': value.placeName,
    'tournamentStatus': TournamentStatus.BUILDING,
    'tournamentType': value.tournamentType
  }
}
/*{
  "title": "Football Tournament 2",
  "startDate": "2024-09-24T16:17:00.328Z",
  "endDate": "2024-08-24T16:17:00.328Z",
  "placeName": "FootballPark",
  "address": {
    "street": "Rue du Paradis, 21",
    "city": "Namur",
    "zip": "5000",
    "state": "Namur",
    "country": "Belgique"
  },
  "tournamentType": "KNOCKOUT_16",
  "tournamentStatus": "BUILDING"
}*/