import { Component } from '@angular/core';
import {SettingsService} from '../settings.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent   {
  firenow;
  constructor(private ss: SettingsService) {
    this.firenow = ss.firebaseStore;
  }
  changedStore(event) {
    this.ss.setfirestore(event.target.value === 'true');
    this.firenow = this.ss.firebaseStore;
  }
}
