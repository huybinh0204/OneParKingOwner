import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ParkDetailsPage} from './park-details.page';

const routes: Routes = [
  {
    path: '',
    component: ParkDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ParkDetailsRouttingModule {}
