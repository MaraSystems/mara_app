import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { Client } from 'src/app/client/utils/models/client';
import { selectAuthClient } from 'src/app/client/utils/store/client-store.selector';
import { UnSubscriber } from 'src/app/general/utils/services/unsubscriber.service';
import { Comment } from '../../utils/models/comment.model';
import { toggleList } from 'src/app/general/utils/lib/toggleList';
import { DeleteCommentAction, ListCommentsAction, UpdateCommentAction } from '../../utils/store/comment-store.action';
import { CommentEnum } from '../../utils/models/comment.enum';
import { selectCommentsByModelId } from '../../utils/store/comment-store.selector';
import { DownloadAttachmentAction, GetAttachmentAction } from '../../../attachment/utils/store/attachment-store.action';
import { selectAttachmentById } from '../../../attachment/utils/store/attachment-store.selector';
import { More } from 'src/app/general/utils/models/more.model';
import { PopupService } from '../../../popup/features/popup.service';

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
  bookmarked = false;
  commentsCount = 0;
  attachment = '';

  moreList: More[] = [];

  constructor(
    public store: Store,
    public popupService: PopupService
  ){
    super();
  }

  ngOnInit(): void {
    this.store.dispatch(new ListCommentsAction(CommentEnum.COMMENT, this.comment._id));

    this.newSubscription = this.store.select(selectAuthClient).subscribe(client => {
      this.client = client;
      this.liked = this.comment.likes.includes(this.client._id);
      this.bookmarked = this.comment.bookmarks.includes(this.client._id);

      this.moreList = this.client._id === this.comment.userId
        ? this.moreList = [
            { name: 'Delete', icon: 'Delete', action: () => { this.deleteComment() } }
          ]
        : [];
    });

    this.newSubscription = this.store.select(selectCommentsByModelId(CommentEnum.COMMENT, this.comment._id)).subscribe(comments => {
      this.commentsCount = comments.length;
    });
    
    if (this.comment.attachment) {
      this.store.dispatch(new GetAttachmentAction(this.comment.attachment));
      this.newSubscription = this.store.select(selectAttachmentById(this.comment.attachment)).subscribe(attachment => {
        this.attachment = attachment.url;
      });
    }
  }

  likeToggle(){
    const likes = toggleList([...this.comment.likes], this.client._id);    
    this.store.dispatch(new UpdateCommentAction({ id: this.comment._id, changes: { likes } }));
  }

  bookmarkToggle(){
    const bookmarks = toggleList([...this.comment.bookmarks], this.client._id);    
    this.store.dispatch(new UpdateCommentAction({ id: this.comment._id, changes: { bookmarks } }));
  }

  deleteComment() {
    this.store.dispatch(new DeleteCommentAction(this.comment._id));
  }
}
