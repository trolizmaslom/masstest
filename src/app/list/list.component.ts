import {Component, OnDestroy, OnInit} from '@angular/core';
import {FirebaseService} from '../fireserv.service';
import {Observable} from 'rxjs';
import {ModalService} from '../modal.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit, OnDestroy {
  items;
  private subscription;
  constructor( public fireService: FirebaseService, private modal: ModalService) {  }
  ngOnInit() {
     this.subscription = this.fireService.allRecords.subscribe(res => {
        this.items = res;
     });
  }
  fakeCreate() {
    this.modal.createModal.next(true);
  }
  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

}
