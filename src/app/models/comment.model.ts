export class CommentModel {
  id: string;
  author: string;
  content: string;
  created_at: string;
  parent_id: string;
  constructor (id: string, author: string, content: string, date: string, parent_id: string) {
    this.id = id;
    this.author = author;
    this.content = content;
    this.created_at = date;
    this.parent_id = parent_id;
  }
}
