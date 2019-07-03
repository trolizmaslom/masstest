import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  firebaseStore = true;
  constructor() {}
  setfirestore(bool: boolean) {
    this.firebaseStore = bool;
  }
}
