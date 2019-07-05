import {Component, OnDestroy, Output} from '@angular/core';
import {FirebaseService} from '../fireserv.service';
import {ModalService} from '../modal.service';
import {SettingsService} from '../settings.service';
import {LocalStoreService} from '../local-store.service';

@Component({
  selector: 'app-create-record',
  templateUrl: './create-record.component.html',
  styleUrls: ['./create-record.component.scss']
})
export class CreateRecordComponent  implements OnDestroy {
  private subscription;
  constructor( private fireService: FirebaseService,
               private modal: ModalService,
               private setings: SettingsService,
               private local: LocalStoreService) {}
  onSubmit(form) {
    if (form.valid) {
      const record = {
        name: form.value.name,
        content: form.value.content,
        comments: []
      };
      if (this.setings.firebaseStore) {
        this.subscription = this.fireService.createRecord(record).subscribe(res => {
          this.modal.createModal.next(false);
          form.reset();
        });
      } else {
        this.local.createRecord(record);
        form.reset();
      }

    }
  }
  ngOnDestroy() {
    if (this.subscription) {this.subscription.unsubscribe(); }
  }
  closeModal() {
    this.modal.createModal.next(false);
  }
}
