import { Injectable } from '@angular/core';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  createModal = new Subject();
  constructor() {
    this.createModal.next(false);
  }
}
