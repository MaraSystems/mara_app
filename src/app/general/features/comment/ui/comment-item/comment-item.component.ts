import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { Client } from 'src/app/client/utils/models/client';
import { selectAuthClient } from 'src/app/client/utils/store/client-store.selector';
import { UnSubscriber } from 'src/app/general/utils/services/unsubscriber.service';
import { Comment } from '../../utils/models/comment.model';
import { toggleList } from 'src/app/general/utils/lib/toggleList';
import { ListCommentsAction, UpdateCommentAction } from '../../utils/store/comment-store.action';
import { CommentEnum } from '../../utils/models/comment.enum';
import { selectCommentsByModelId } from '../../utils/store/comment-store.selector';

@Component({
  selector: 'app-comment-item',
  templateUrl: './comment-item.component.html',
  styleUrls: ['./comment-item.component.scss']
})
export class CommentItemComponent extends UnSubscriber implements OnInit {
  @Input() comment!: Comment;
  @Output() open = new EventEmitter();

  client!: Client;
  liked = false;
  commentsCount = 0;

  constructor(
    public store: Store
  ){
    super();
  }

  ngOnInit(): void {
    this.store.dispatch(new ListCommentsAction(CommentEnum.COMMENT, this.comment._id));

    this.newSubscription = this.store.select(selectAuthClient).subscribe(client => {
      this.client = client;
      this.liked = this.comment.likes.includes(this.client._id);
    });

    this.newSubscription = this.store.select(selectCommentsByModelId(CommentEnum.COMMENT, this.comment._id)).subscribe(comments => {
      this.commentsCount = comments.length;
    });
  }

  likeToggle(){
    const likes = toggleList([...this.comment.likes], this.client._id);    
    this.store.dispatch(new UpdateCommentAction({ id: this.comment._id, changes: { likes } }));
  }
}
