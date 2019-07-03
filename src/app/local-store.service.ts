import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocalStoreService {
  allRecords = new BehaviorSubject([]);
  activeRecord = new BehaviorSubject([]);
  tempAllData = new Array();
  constructor() {
    const data = JSON.parse(localStorage.getItem('dataSourceAll'));
    this.tempAllData = data !== null && data.length > 0  ? data : [];
    this.allRecords.next(this.tempAllData);
  }
  public createRecord(record) {
    record.id = this.tempAllData.length + '_' + Math.random().toString(36).substr(2, 9);
    record.comments_item = [];
    this.tempAllData.push(record);
    this.updateDataStorage();
  }
  public getRecordByID(id) {
    const result = this.tempAllData.filter(item => {
      return item.id === id;
    });
    this.activeRecord.next(result[0]);
  }
  public updateRecord(record) {
    this.tempAllData.forEach(item => {
      if (item.id === record.id) {
        item.name = record.name;
        item.content = record.content;
      }
    });
    this.updateDataStorage();
  }
  public addComment(comment) {
    this.tempAllData.forEach(item => {
      if (item.id === comment.parent_id) {
        item.comments_item.push(comment);
        item.comments.push(comment);
      }
    });
    this.updateDataStorage();
  }
  public deleteRecord(id) {
    for ( let i = 0; i < this.tempAllData.length; i++) {
      if ( this.tempAllData[i].id === id) {
        this.tempAllData.splice(i, 1);
      }
    }
    this.updateDataStorage();
  }
  private updateDataStorage() {
    this.allRecords.next(this.tempAllData);
    const json = JSON.stringify(this.tempAllData);
    localStorage.setItem('dataSourceAll', json);
  }
}
