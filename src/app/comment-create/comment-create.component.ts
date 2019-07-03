import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {FirebaseService} from '../fireserv.service';
import {SettingsService} from '../settings.service';
import {LocalStoreService} from '../local-store.service';

@Component({
  selector: 'app-comment-create',
  templateUrl: './comment-create.component.html',
  styleUrls: ['./comment-create.component.scss']
})
export class CommentCreateComponent implements OnDestroy {
  @Input() id;
  private subscription;
  constructor(
    private fireService: FirebaseService,
    private setings: SettingsService,
    private local: LocalStoreService) { }

  ngOnDestroy() {
    if (this.subscription) {this.subscription.unsubscribe();}
  }
  onSubmit(form) {
    if (form.valid) {
      const comment = {
        author: form.value.author,
        content: form.value.content,
        created_at : new Date(),
        parent_id: this.id
      }
      if (this.setings.firebaseStore){
        this.subscription = this.fireService.addComment(comment).subscribe(res => {
          form.reset();
        });
      } else {
        this.local.addComment(comment);
        form.reset();
      }
    }
  }

}
