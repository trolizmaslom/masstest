import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {FirebaseService} from '../fireserv.service';
import {CommentModel} from '../models/comment.model';

@Component({
  selector: 'app-comment-create',
  templateUrl: './comment-create.component.html',
  styleUrls: ['./comment-create.component.scss']
})
export class CommentCreateComponent implements OnDestroy {
  @Input() id;
  private subscription;
  constructor( private fireService: FirebaseService) { }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
  onSubmit(form) {
    if (form.valid) {
      const comment = {
        author: form.value.author,
        content: form.value.content,
        parent_id: this.id}
      this.subscription = this.fireService.addComment(comment).subscribe(res => {console.log(res); });
    }
  }

}
