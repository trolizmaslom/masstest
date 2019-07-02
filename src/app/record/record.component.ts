import {Component, OnDestroy, OnInit} from '@angular/core';
import {FirebaseService} from '../fireserv.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-record',
  templateUrl: './record.component.html',
  styleUrls: ['./record.component.scss']
})
export class RecordComponent implements OnInit, OnDestroy {
  item;
  private subscription;
  private subscription2;
  private subscription3;
  constructor(public fireService: FirebaseService, private route: ActivatedRoute) {  }
  ngOnInit() {
    this.subscription3 = this.fireService.activeRecord.subscribe( res => {
      this.item = res;
    });
    this.subscription2 = this.fireService.allRecords.subscribe( () => {
      this.fireService.getRecordByID(this.route.snapshot.params['id']);

    });
    this.subscription = this.route.params.subscribe( (params) => {
       this.fireService.getRecordByID(params['id']);
    });

  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.subscription2.unsubscribe();
    this.subscription3.unsubscribe();
  }

}
