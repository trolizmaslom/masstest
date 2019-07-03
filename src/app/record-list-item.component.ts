import {Component, Input, OnDestroy} from '@angular/core';
import {RecordModel} from './models/record.model';
import {FirebaseService} from './fireserv.service';
import {SettingsService} from './settings.service';
import {LocalStoreService} from './local-store.service';

@Component({
  selector: 'app-record-list-item',
  templateUrl: './record-list-item.component.html'
})
export class RecordListItemComponent implements OnDestroy{
  @Input() element: RecordModel;
  private subscription;
  constructor(
    private fireService: FirebaseService,
    private setings: SettingsService,
    private local: LocalStoreService) { }
    ngOnDestroy() {
      if (this.subscription){this.subscription.unsubscribe();}
    }
  deleteOne(id) {
    if (this.setings.firebaseStore) {
      this.subscription = this.fireService.deleteRecord(id).subscribe(res => {
        console.log(res);
      });
    } else {
      this.local.deleteRecord(id);
    }
  }
}
