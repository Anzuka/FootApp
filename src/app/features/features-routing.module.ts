import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';


const routes: Routes = [
    { path: '', component: HomeComponent },
    {
      path:'user', loadChildren: ()=> import('./user/user.module').then(m => m.UserModule)
    },
    {
      path: 'tournament', loadChildren: () => import('./tournament/tournament.module').then(m => m.TournamentModule)
    },
  {
    path: 'match', loadChildren:() => import('./match/match.module').then(m => m.MatchModule)
  }


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FeaturesRoutingModule { }
