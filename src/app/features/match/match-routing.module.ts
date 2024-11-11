import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {MatchListComponent} from './match.list/match.list.component';
import {MatchDetailsComponent} from './match.details/match.details.component';

const routes: Routes = [
  { path: 'list', component: MatchListComponent },
  { path: 'details/:id', component: MatchDetailsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MatchRoutingModule { }
