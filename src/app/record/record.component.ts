import {Component, OnDestroy, OnInit} from '@angular/core';
import {FirebaseService} from '../fireserv.service';
import {ActivatedRoute} from '@angular/router';
import {SettingsService} from '../settings.service';
import {LocalStoreService} from '../local-store.service';

@Component({
  selector: 'app-record',
  templateUrl: './record.component.html',
  styleUrls: ['./record.component.scss']
})
export class RecordComponent implements OnInit, OnDestroy{
  item;
  edit = false;
  private subscription;
  private subscription2;
  private subscription3;
  constructor(
    public fireService: FirebaseService,
    private route: ActivatedRoute,
    private setings: SettingsService,
    private local: LocalStoreService) {}

  ngOnInit() {
    if (this.setings.firebaseStore) {
      this.subscription3 = this.fireService.activeRecord.subscribe( res => {
        this.item = res;
      });
    } else {
      this.subscription3 = this.local.activeRecord.subscribe( res => {
        this.item = res;
      });
    }
    if (this.setings.firebaseStore) {
      this.subscription2 = this.fireService.allRecords.subscribe( () => {
        this.fireService.getRecordByID(this.route.snapshot.params['id']);
      });
    } else {
        this.local.getRecordByID(this.route.snapshot.params['id']);
    }
    if (this.setings.firebaseStore) {
      this.subscription = this.route.params.subscribe( (params) => {
        this.fireService.getRecordByID(params['id']);
      });
    } else {
      this.subscription = this.route.params.subscribe( (params) => {
        this.local.getRecordByID(params['id']);
      });
    }

  }
  ngOnDestroy() {
    if (this.subscription) {this.subscription.unsubscribe(); }
    if (this.subscription2) {this.subscription2.unsubscribe(); }
    this.subscription3.unsubscribe();
  }
  onSubmit(form, id) {
    if (form.valid) {
      const record = {
        name: form.value.name,
        content: form.value.content,
        id: id
      }
      if (this.setings.firebaseStore){
        this.subscription = this.fireService.updateRecord(record).subscribe(res => {
          this.edit = false;
        });
      } else {
        this.local.updateRecord(record);
        this.edit = false;
      }
    }
  }
}
