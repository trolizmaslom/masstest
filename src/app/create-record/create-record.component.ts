import {Component, OnDestroy, Output} from '@angular/core';
import {FirebaseService} from '../fireserv.service';
import {ModalService} from '../modal.service';

@Component({
  selector: 'app-create-record',
  templateUrl: './create-record.component.html',
  styleUrls: ['./create-record.component.scss']
})
export class CreateRecordComponent  implements OnDestroy {
  private subscription;
  constructor( private fireService: FirebaseService, private modal: ModalService) { }
  onSubmit(form) {
    if (form.valid) {
      const record = {
        name: form.value.name,
        content: form.value.content,
        comments: []
      }
      this.subscription = this.fireService.createRecord(record).subscribe(res => {
        this.modal.createModal.next(false);
      });
    }
  }
  ngOnDestroy(){
    this.subscription.unsubscribe();
  }
  closeModal() {
    this.modal.createModal.next(false);
  }
}
