import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
    //Redirige ceux qui essaye de se rendre vers 'http://localhost:4200' vers 'http://localhost:4200/home'
    { path: '', component: HomeComponent },


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FeaturesRoutingModule { }
