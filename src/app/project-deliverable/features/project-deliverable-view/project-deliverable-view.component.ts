import { Component, OnInit } from '@angular/core';
import { BaseComponent } from 'src/app/general/utils/services/basecomponent.service';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.state';
import { ActivatedRoute } from '@angular/router';
import { More } from 'src/app/general/utils/models/more';
import { PopupService } from 'src/app/general/features/popup/popup.service';
import { ProjectDeliverable } from '../../utils/models/project-deliverable';
import { DeleteProjectDeliverableAction, GetProjectDeliverableAction, UpdateProjectDeliverableAction } from '../../utils/store/project-deliverable-store.action';
import { selectProjectDeliverableById } from '../../utils/store/project-deliverable-store.selector';
import { Attachment } from 'src/app/attachment/utils/models/attachment';
import { ListAttachmentsAction } from 'src/app/attachment/utils/store/attachment-store.action';
import { toggleList } from 'src/app/general/utils/lib/toggleList';
import { selectActiveAuth } from 'src/app/auth/utils/store/auth-store.selector';
import { Auth } from 'src/app/auth/utils/models/auth.model';
import { selectCommentsByModelId } from 'src/app/comment/utils/store/comment-store.selector';
import { ListCommentsAction } from 'src/app/comment/utils/store/comment-store.action';
import { CommentType } from 'src/app/comment/utils/models/comment-type';
import { GetProjectAction } from 'src/app/project/utils/store/project-store.action';
import { selectProjectById } from 'src/app/project/utils/store/project-store.selector';
import { Toast } from 'src/app/general/features/toast/utils/models/toast';
import { AttachmentType } from 'src/app/attachment/utils/models/attachment-type';

@Component({
  selector: 'app-project-deliverable-view',
  templateUrl: './project-deliverable-view.component.html',
  styleUrls: ['./project-deliverable-view.component.scss']
})
export class ProjectDeliverableViewComponent extends BaseComponent implements OnInit {
  auth!: Auth;
  deliverable!: ProjectDeliverable;
  attachment: Attachment[] = [];
  id!: string;
  liked = false;
  bookmarked = false;
  moreList: More[] = [];
  commentModel = CommentType.PROJECT;
  commentsCount = 0;
  attatmentModel = AttachmentType;

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
    this.store.dispatch(new ListAttachmentsAction(AttachmentType.PROJECT_DELIVERABLE, this.id));
    
    this.newSubscription = this.store.select(selectProjectDeliverableById(this.id)).subscribe(deliverable => {
      this.deliverable = deliverable;        
      if (this.deliverable) {
        this.store.dispatch(new GetProjectAction(deliverable.projectId));

        this.newSubscription = this.store.select(selectActiveAuth).subscribe(auth => {
          this.auth = auth;
          this.liked = this.deliverable.likes.includes(this.auth.id);      
          this.bookmarked = this.deliverable.bookmarks.includes(this.auth.id);      

          this.newSubscription = this.store.select(selectProjectById(deliverable.projectId)).subscribe(project => {
            this.moreList = auth.id === project.userId
            ? this.moreList = [
              { name: 'Update', icon: 'update', popup: `project-deliverable-update-${this.id}` },
              { name: 'Delete', icon: 'Delete', action: () => { this.delete() } }
            ]
            : [];
          });
        }); 
      }
    });

    
    this.store.dispatch(new ListCommentsAction(this.commentModel, this.id));

    this.newSubscription = this.store.select(selectCommentsByModelId(this.commentModel, this.id)).subscribe(comments => {
      this.commentsCount = comments.length;
    });
  }

  delete() {
    Toast.warn(this.store, 'Click continue to delete project deliverable', ['Continue'], () => {
      this.store.dispatch(new DeleteProjectDeliverableAction(this.id));
    });
  }

  likeToggle(){
    const likes = toggleList([...this.deliverable.likes], this.auth.id);    
    this.store.dispatch(new UpdateProjectDeliverableAction({ id: this.id, changes: { likes } }));
  }

  bookmarkToggle(){
    const bookmarks = toggleList([...this.deliverable.bookmarks], this.auth.id);    
    this.store.dispatch(new UpdateProjectDeliverableAction({ id: this.id, changes: { bookmarks } }));
  }

  updateSharedList(list: string[]){    
    const shares = this.deliverable.shares + list.length;    
    this.store.dispatch(new UpdateProjectDeliverableAction({ id: this.id, changes: { shares } }));
  }
}
