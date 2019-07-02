import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {RecordComponent} from './record/record.component';

const routes: Routes = [
  { path: 'record/:id', component: RecordComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
