import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TournamentListComponent } from './tournament.list/tournament.list.component';
import { TournamentInfoComponent } from './tournament-info/tournament-info.component';
import { TournamentFormComponent } from './tournament.form/tournament.form.component';

const routes: Routes = [
    { path:'list', component: TournamentListComponent},
    { path: ':id', component: TournamentInfoComponent},
    { path: 'new', component: TournamentFormComponent}
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class TournamentRoutingModule { }