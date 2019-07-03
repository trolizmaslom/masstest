import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {RecordComponent} from './record/record.component';
import {SettingsComponent} from './settings/settings.component';

const routes: Routes = [
  { path: 'record/:id', component: RecordComponent },
  { path: 'record', component: RecordComponent },
  { path: '', component: RecordComponent },
  { path: 'settings', component: SettingsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
