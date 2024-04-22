import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { UnSubscriber } from 'src/app/shared/utils/services/unsubscriber.service';
import { ListCommentsAction } from '../../utils/store/comment-store.action';
import { selectCommentsByModelId } from '../../utils/store/comment-store.selector';
import { Comment } from '../../utils/models/comment.model';
import { CommentEnum } from '../../utils/models/comment.enum';

@Component({
  selector: 'app-comment-list',
  templateUrl: './comment-list.component.html',
  styleUrls: ['./comment-list.component.scss']
})
export class CommentListComponent extends UnSubscriber implements OnInit {
  @Input() model!: CommentEnum;
  @Input() modelId = '';

  comments: Comment[] = [];

  constructor(
    public store: Store
  ){
    super();
  }

  ngOnInit(): void {
    this.store.dispatch(new ListCommentsAction(this.model, this.modelId));

    this.newSubscription = this.store.select(selectCommentsByModelId(this.model, this.modelId)).subscribe(comments => {
      this.comments = comments;
      console.log(this.comments);
      
    });
  }
}
