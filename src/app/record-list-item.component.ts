import {Component, Input} from '@angular/core';
import {RecordModel} from './models/record.model';
import {FirebaseService} from './fireserv.service';

@Component({
  selector: 'app-record-list-item',
  templateUrl: './record-list-item.component.html'
})
export class RecordListItemComponent {
  @Input() element: RecordModel;
  constructor(private fireService: FirebaseService) { }
  deleteOne(id){
    this.fireService.deleteRecord(id).subscribe(res => {
      console.log(res);
    });
  }
}
