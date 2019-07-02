import {CommentModel} from './comment.model';

export class RecordModel {
  name: string;
  content: string;
  id: string;
  comments: Array<string>;
  comments_item: CommentModel[];
  constructor (id: string, name: string, content: string, comments: Array<string>, comments_item: CommentModel[] ) {
    this.id = id;
    this.name = name;
    this.content = content;
    this.comments = comments;
    this.comments_item = comments_item;
  }
}
