import {Component, OnDestroy, OnInit} from '@angular/core';
import {FirebaseService} from '../fireserv.service';
import {ModalService} from '../modal.service';
import {SettingsService} from '../settings.service';
import {LocalStoreService} from '../local-store.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit, OnDestroy {
  items;
  private subscription;
  constructor(
    public fireService: FirebaseService,
    private modal: ModalService,
    private setings: SettingsService,
    private local: LocalStoreService) {}
  ngOnInit() {
     if (this.setings.firebaseStore) {
       this.subscription = this.fireService.allRecords.subscribe(res => {
         this.items = res;
       });
     } else {
        this.subscription = this.local.allRecords.subscribe(res => {
          this.items = res;
        });
     }
  }
  fakeCreate() {
    this.modal.createModal.next(true);
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
