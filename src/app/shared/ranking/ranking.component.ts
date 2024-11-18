// ranking.component.ts
import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { RankingModel } from './tools/ranking.model';
import {map, Observable, of} from 'rxjs';

@Component({
  selector: 'app-ranking',
  templateUrl: './ranking.component.html',
  styleUrls: ['./ranking.component.scss']
})
export class RankingComponent implements OnInit {
  @Input() rankings!: RankingModel[]; // Utilisation de @Input pour recevoir les données
  @Output() rankingLoaded = new EventEmitter<boolean>();
  sortedRankings$!: Observable<RankingModel[]>;
  numGroup: number = 0

  ngOnInit() {
    console.log("rankings from ranking: ",this.rankings);
    this.rankingLoaded.emit(true);// Les données de classement devraient apparaître ici

    this.sortedRankings$ = of(this.rankings).pipe(
      map(rankings => rankings.sort((a, b) => a.rankingPosition - b.rankingPosition))
    );
    this.numGroup = this.rankings[0].numGroup
  }
}
