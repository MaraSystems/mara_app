import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Revision } from '../../utils/models/revision';
import { BaseComponent } from 'src/app/general/utils/services/basecomponent.service';
import { Store } from '@ngrx/store';
import { GetClientAction } from 'src/app/client/utils/store/client-store.action';
import { Client } from 'src/app/client/utils/models/client';
import { selectClientById } from 'src/app/client/utils/store/client-store.selector';
import { GetCommentAction } from 'src/app/comment/utils/store/comment-store.action';
import { RevisionStatus } from '../../utils/models/revision-status';
import { selectCommentById } from 'src/app/comment/utils/store/comment-store.selector';
import { Comment } from 'src/app/comment/utils/models/comment';
import { CommentType } from 'src/app/comment/utils/models/comment-type';
import { More } from 'src/app/general/utils/models/more';
import { GetAttachmentAction } from 'src/app/attachment/utils/store/attachment-store.action';
import { Attachment } from 'src/app/attachment/utils/models/attachment';
import { selectAttachmentById } from 'src/app/attachment/utils/store/attachment-store.selector';

@Component({
  selector: 'app-revision-comment',
  templateUrl: './revision-comment.component.html',
  styleUrls: ['./revision-comment.component.scss']
})
export class RevisionCommentComponent extends BaseComponent implements OnInit {
  @Input({ required: true }) commentId!: string;
  @Output() commented = new EventEmitter<string>();

  comment!: Comment;
  commentType = CommentType;
  referencedComment!: Comment;
  attachment!: Attachment;
  moreList: More[] = [];

  constructor(
    private store: Store
  ){
    super();
  }

  ngOnInit(): void {
    this.store.dispatch(new GetCommentAction(this.commentId));

    this.newSubscription = this.store.select(selectCommentById(this.commentId)).subscribe(comment => {
      this.comment = comment;            

      if (this.comment) {
        if (this.comment.model === CommentType.COMMENT) {
          this.store.dispatch(new GetCommentAction(this.comment.modelId));
          this.newSubscription = this.store.select(selectCommentById(this.comment.modelId)).subscribe(referencedComment => {
            this.referencedComment = referencedComment;
          });
        }

        if (this.comment.model === CommentType.ATTACHMENT) {
          this.store.dispatch(new GetAttachmentAction(this.comment.modelId));

          this.newSubscription = this.store.select(selectAttachmentById(this.comment.modelId)).subscribe(attachment => {
            this.attachment = attachment;            
          });
        }

        this.setOptions();
      }
    });
  }

  setOptions() {    
    this.moreList.push({ name: 'Reply', icon: 'comment', popup: `revision-comment-reply-${this.commentId}` }); 
  }
}
