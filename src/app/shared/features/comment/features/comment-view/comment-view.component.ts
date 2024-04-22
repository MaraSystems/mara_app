import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { UnSubscriber } from 'src/app/shared/utils/services/unsubscriber.service';
import { GetCommentAction, ListCommentsAction } from '../../utils/store/comment-store.action';
import { selectCommentById, selectCommentsByModelId } from '../../utils/store/comment-store.selector';
import { Comment } from '../../utils/models/comment.model';

@Component({
  selector: 'app-comment-view',
  templateUrl: './comment-view.component.html',
  styleUrls: ['./comment-view.component.scss']
})
export class CommentViewComponent extends UnSubscriber implements OnInit {
  @Input() id = '';
  comment!: Comment;

  constructor(
    public store: Store
  ){
    super();
  }

  ngOnInit(): void {
    this.store.dispatch(new GetCommentAction(this.id));

    this.newSubscription = this.store.select(selectCommentById(this.id)).subscribe(comment => {
      this.comment = comment;      
    });
  }
}
