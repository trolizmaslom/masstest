import {Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import * as firebase from 'firebase';
import {CommentModel} from './models/comment.model';

@Injectable({providedIn: 'root'})
export class FirebaseService {
  allRecords = new BehaviorSubject([]);
  activeRecord = new BehaviorSubject([]);
  private arrayComments = new Array();
  private arrayRecords = new Array();
  constructor  ( private db: AngularFirestore) {
    this.db.collection('/records').snapshotChanges().subscribe(response => {
      this.arrayRecords = [];
      response.forEach(item => {
        const object = {
          id: item.payload.doc.id,
          name: item.payload.doc.data()['name'],
          content: item.payload.doc.data()['content'],
          comments: item.payload.doc.data()['comments'] || [],
          comments_item: [],
        };
        this.arrayRecords.push(object);
      });
      this.db.collection('/comments').snapshotChanges().subscribe(rescom => {
        this.arrayComments = [];
        rescom.forEach(item => {
          const object: CommentModel = {
            id: item.payload.doc.id,
            author: item.payload.doc.data()['author'],
            content: item.payload.doc.data()['content'],
            created_at: item.payload.doc.data()['created_at'],
            parent_id: item.payload.doc.data()['parent_id'],
          };
          this.arrayComments.push(object);
          this.arrayRecords.forEach(record => {
            if (record.id === item.payload.doc.data()['parent_id']) {
              record.comments_item.push(object);
            }
          });
        });
        this.allRecords.next(this.arrayRecords);
      });
    });
  }
  public updateRecord(record) {
    console.log(record)
    return new Observable((observer) => {
        this.db.collection('/records').doc(record.id)
          .update({name: record.name, content: record.content})
          .then(() => {
            observer.next('new record added');
        });
    });
  }
  public getRecordByID(id) {
    const result = this.arrayRecords.filter(obj => {
      return obj.id === id;
    });
    this.activeRecord.next(result[0]);
  }
  public createRecord(data) {
    return new Observable((observer) => {
      this.db.collection('/records').add(data).then(() => {
        observer.next('new record added');
      });
    });
  }
  public addComment(comment) {
    return new Observable((observer) => {
      this.db.collection('/comments').add({
        created_at: firebase.firestore.Timestamp.fromDate(new Date()),
        author: comment.author,
        content: comment.content,
        parent_id: comment.parent_id
      }).then((res) => {
        this.db.collection('/records').doc(comment.parent_id)
          .update({comments: firebase.firestore.FieldValue.arrayUnion(res.id)})
          .then(() => {
              observer.next('new record added');
        });
      });

    });
  }
  public deleteRecord(id) {
    return new Observable((observer) => {
      this.db.collection('/records').doc(id).delete().then(() => {
        observer.next('record deleted');
      });
    });
  }
}
