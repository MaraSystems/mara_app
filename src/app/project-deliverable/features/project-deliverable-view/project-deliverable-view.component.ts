import { Component, OnInit } from '@angular/core';
import { UnSubscriber } from 'src/app/general/utils/services/unsubscriber.service';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.state';
import { ActivatedRoute } from '@angular/router';
import { More } from 'src/app/general/utils/models/more.model';
import { PopupService } from 'src/app/general/features/popup/features/popup.service';
import { ProjectDeliverable } from '../../utils/models/project-deliverable.model';
import { DeleteProjectDeliverableAction, GetProjectDeliverableAction, UpdateProjectDeliverableAction } from '../../utils/store/project-deliverable-store.action';
import { selectProjectDeliverableById } from '../../utils/store/project-deliverable-store.selector';
import { Attachment } from 'src/app/general/features/attachment/utils/models/attatchment.model';
import { ListAttachmentsAction } from 'src/app/general/features/attachment/utils/store/attatchment-store.action';
import { toggleList } from 'src/app/general/utils/lib/toggleList';
import { selectActiveAuth } from 'src/app/auth/utils/store/auth-store.selector';
import { Auth } from 'src/app/auth/utils/models/auth.model';
import { selectCommentsByModelId } from 'src/app/general/features/comment/utils/store/comment-store.selector';
import { ListCommentsAction } from 'src/app/general/features/comment/utils/store/comment-store.action';
import { CommentEnum } from 'src/app/general/features/comment/utils/models/comment.enum';

@Component({
  selector: 'app-project-deliverable-view',
  templateUrl: './project-deliverable-view.component.html',
  styleUrls: ['./project-deliverable-view.component.scss']
})
export class ProjectDeliverableViewComponent extends UnSubscriber implements OnInit {
  auth!: Auth;
  deliverable = new ProjectDeliverable();
  attachment: Attachment[] = [];
  id!: string;
  liked = false;
  bookmarked = false;
  moreList: More[] = [];
  commentModel = CommentEnum.PROJECT;
  commentsCount = 0;

  constructor(
    public store: Store<AppState>,
    private activatedRoute: ActivatedRoute,
    public popupService: PopupService
  ){
    super();
  }

  ngOnInit(): void {    
    this.id = this.activatedRoute.snapshot.paramMap.get('deliverable_id') as string;   
    this.store.dispatch(new GetProjectDeliverableAction(this.id)); 
    this.store.dispatch(new ListAttachmentsAction('project-document', this.id));
    
    this.newSubscription = this.store.select(selectProjectDeliverableById(this.id)).subscribe(deliverable => {
      this.deliverable = deliverable;  
      
      if (this.deliverable) {
        this.newSubscription = this.store.select(selectActiveAuth).subscribe(auth => {
          this.auth = auth;
          this.liked = this.deliverable.likes.includes(this.auth.id);      
          this.bookmarked = this.deliverable.bookmarks.includes(this.auth.id);      
        }); 
      }
    });

    this.moreList = [
      { name: 'Update', icon: 'update', popup: `project-deliverable-update-${this.id}` },
      { name: 'Delete', icon: 'Delete', popup: `project-deliverable-delete-${this.id}` }
    ];
    this.store.dispatch(new ListCommentsAction(this.commentModel, this.id));

    this.newSubscription = this.store.select(selectCommentsByModelId(this.commentModel, this.id)).subscribe(comments => {
      this.commentsCount = comments.length;
    });
  }

  delete() {
    this.store.dispatch(new DeleteProjectDeliverableAction(this.id));
  }

  likeToggle(){
    const likes = toggleList([...this.deliverable.likes], this.auth.id);    
    this.store.dispatch(new UpdateProjectDeliverableAction({ id: this.id, changes: { likes } }));
  }

  bookmarkToggle(){
    const bookmarks = toggleList([...this.deliverable.bookmarks], this.auth.id);    
    this.store.dispatch(new UpdateProjectDeliverableAction({ id: this.id, changes: { bookmarks } }));
  }
}
