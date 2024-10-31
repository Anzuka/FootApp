import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TournamentListComponent } from './tournament.list/tournament.list.component';
import { TournamentInfoComponent } from './tournament-info/tournament-info.component';

const routes: Routes = [
    { path:'list', component: TournamentListComponent},

    { path: ':id', component: TournamentInfoComponent}
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class TournamentRoutingModule { }