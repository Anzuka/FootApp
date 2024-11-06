import { Component } from '@angular/core';
import { TournamentModel } from '../tools/models/tournament.model';
import { TournamentType } from '../tools/enums/tournament-type';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TournamentService } from '../tools/services/tournament.service';
import { TournamentCreateModel } from '../tools/models/tournament.create.model';
import { TournamentStatus } from '../tools/enums/tournament-status';
import { startBeforeEndDate } from '../../../shared/validators/start-before-end-date';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { noWhitespaceValidator } from '../../../shared/validators/no-whitespace';

@Component({
  selector: 'app-tournament.form',
  templateUrl: './tournament.form.component.html',
  styleUrl: './tournament.form.component.scss'
})

export class TournamentFormComponent {
  tournamentForm!: FormGroup;
  tournamentTypes = Object.values(TournamentType); 
  errorMessages: string[] = [];

  constructor(private _router: Router, private fb: FormBuilder, private _serviceTournament: TournamentService){}
  
  ngOnInit(){
    this.tournamentForm = this.fb.group(
      {
        title: ['', [Validators.required, Validators.minLength(1), noWhitespaceValidator()]],
        startDate: [null],
        endDate: [null],
        placeName: ['', [Validators.required, Validators.minLength(1), noWhitespaceValidator()]],
        address: this.fb.group({
          street: [null],
          city: [null],
          zip: [null],
          state: [null],
          country: [null]
        }),
        tournamentType: [null, Validators.required],
    }, 
    {validators: [startBeforeEndDate()]}
  );
  }


  get addressForm(): FormGroup{
    return this.tournamentForm.get('address') as FormGroup;
  }

  onSubmit() {
    this.tournamentForm.markAllAsTouched();
    this.errorMessages.length = 0;
    if(this.tournamentForm.valid){
      let value: TournamentModel = this.tournamentForm.value;
      console.log(value);
      this._serviceTournament.createOne(mapToTournamentCreateModel(value)).subscribe({
        // Change de route
        next: () => {
          this._router.navigate(['/tournament/organize']);
        },
        // Si erreurs
        error: (error: HttpErrorResponse) => {          
          this.errorMessages = error.error.errors;
        }
      });
      
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
