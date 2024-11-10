import {Component, OnInit} from '@angular/core';
import {MatchModel} from '../tools/models/match.model';
import {MatchService} from '../tools/match.service';


@Component({
  selector: 'app-match.list',
  templateUrl: './match.list.component.html',
  styleUrl: './match.list.component.scss'
})
export class MatchListComponent implements OnInit {
  matches: MatchModel[] = [];

  constructor(private _matchService: MatchService) {}

  ngOnInit(): void {
    this._matchService.getAllMatches().subscribe({
      next: (data) => {
        (this.matches = data);
        console.log("data : ", data)
      },
      error: (err) => console.error("Erreur lors de la récupération des matchs:", err)
    });
  }
}
