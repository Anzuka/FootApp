import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TournamentListComponent } from './tournament.list/tournament.list.component';
import { TournamentInfoComponent } from './tournament-info/tournament-info.component';
import { TournamentFormComponent } from './tournament.form/tournament.form.component';

const routes: Routes = [
    { path:'organize', component: TournamentListComponent},
    { path: 'new', component: TournamentFormComponent},
    { path: 'details/:id', component: TournamentInfoComponent},
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class TournamentRoutingModule { }