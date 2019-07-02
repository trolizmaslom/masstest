import { Component } from '@angular/core';
import {FirebaseService} from './fireserv.service';
import {ModalService} from './modal.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'masstest';
  showCreatemodal;
  constructor (private  fireService: FirebaseService, private modal: ModalService) {
    this.modal.createModal.subscribe( res => {
      this.showCreatemodal = res;
    });
  }
}
