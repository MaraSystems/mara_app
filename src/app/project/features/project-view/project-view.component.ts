import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Project } from '../../utils/models/project.model';
import { UnSubscriber } from 'src/app/general/utils/services/unsubscriber.service';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.state';
import { selectProjectById } from '../../utils/store/project-store.selector';
import { ActivatedRoute } from '@angular/router';
import { DeleteProjectAction, GetProjectAction, UpdateProjectAction } from '../../utils/store/project-store.action';
import { More } from 'src/app/general/utils/models/more.model';
import { PopupService } from 'src/app/general/features/popup/features/popup.service';
import { selectAllProjectDeliverables } from 'src/app/project-deliverable/utils/store/project-deliverable-store.selector';
import { ProjectDeliverable } from 'src/app/project-deliverable/utils/models/project-deliverable.model';
import { ListProjectDeliverablesAction } from 'src/app/project-deliverable/utils/store/project-deliverable-store.action';
import { ProjectStatus } from '../../utils/models/project-status.enum';
import { AddToast } from 'src/app/general/features/toast/utils/store/toast.action';
import { selectActiveAuth } from 'src/app/auth/utils/store/auth-store.selector';
import { Auth } from 'src/app/auth/utils/models/auth.model';
import { toggleList } from 'src/app/general/utils/lib/toggleList';
import { CommentEnum } from 'src/app/general/features/comment/utils/models/comment.enum';
import { ListCommentsAction } from 'src/app/general/features/comment/utils/store/comment-store.action';
import { selectCommentsByModelId } from 'src/app/general/features/comment/utils/store/comment-store.selector';
import { ToastEnum } from 'src/app/general/features/toast/utils/models/toast.enum';
import { Toast } from 'src/app/general/features/toast/utils/models/toast.class';
import { ShareEnum } from 'src/app/general/features/share/utils/models/share.enum';
import { Share } from 'src/app/general/features/share/utils/models/share.model';
import { Privacy } from 'src/app/general/features/share/utils/models/privacy';

@Component({
  selector: 'app-project-view',
  templateUrl: './project-view.component.html',
  styleUrls: ['./project-view.component.scss']
})
export class ProjectViewComponent extends UnSubscriber implements OnInit {
  auth!: Auth;
  project = new Project();
  deliverables: ProjectDeliverable[] = [];
  id!: string;
  price!: string;
  duration!: number;

  moreList: More[] = [];

  liked = false;
  bookmarked = false;
  commentModel = CommentEnum.PROJECT;
  shareModel = ShareEnum.PROJECT;
  commentsCount = 0;

  constructor(
    public store: Store<AppState>,
    private activatedRoute: ActivatedRoute,
    public popupService: PopupService,
    private cdr: ChangeDetectorRef
  ){
    super();
  }

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.paramMap.get('project_id') as string;   
    this.store.dispatch(new GetProjectAction(this.id)); 
    this.store.dispatch(new ListProjectDeliverablesAction(this.id));

    this.newSubscription = this.store.select(selectAllProjectDeliverables(this.id)).subscribe(deliverables => {
      this.deliverables = deliverables;
      
      const { price, duration } = this.deliverables.reduce((acc, red) => {
        acc.price += Number(red.price);
        acc.duration += Number(red.duration);
        return acc;
      }, { price: 0, duration: 0 });

      this.price = Intl.NumberFormat('en-US').format(price);
      this.duration = duration;
      this.cdr.detectChanges();
    });
    
    this.newSubscription = this.store.select(selectProjectById(this.id)).subscribe(project => {
      this.project = project;       

      if (this.project) {
        this.newSubscription = this.store.select(selectActiveAuth).subscribe(auth => {
          this.auth = auth;
          this.liked = this.project.likes.includes(this.auth.id);      
          this.bookmarked = this.project.bookmarks.includes(this.auth.id);      
        });         
      }    
    });

    this.newSubscription = this.store.select(selectActiveAuth).subscribe(auth => {      
      this.moreList = auth.id === this.project.userId
        ? this.moreList = [
          { name: 'Update', icon: 'update', popup: `project-update-${this.id}` },
          { name: 'Activate', icon: 'publish', action: () => { this.activate() } },
          { name: 'De-Activate', icon: 'unpublished',action: () => { this.deactivate() } },
          { name: 'Delete', icon: 'Delete', action: () => { this.deleteProject() } }
        ]
        : [];
    });

    this.store.dispatch(new ListCommentsAction(this.commentModel, this.id));

    this.newSubscription = this.store.select(selectCommentsByModelId(this.commentModel, this.id)).subscribe(comments => {
      this.commentsCount = comments.length;
    });
  }

  deleteProject() {
    Toast.warn(this.store, 'Click continue to delete project', ['Continue'], () => {
      this.store.dispatch(new DeleteProjectAction(this.id));
    });
  }

  activate() {
    if (this.deliverables.length === 0) {
      this.store.dispatch(new AddToast({ description: 'You can not publish a project with no deliverables', type: ToastEnum.ERROR }));
      return;
    }

    Toast.warn(this.store, 'Click continue to activate project', ['Continue'], () => {
      this.store.dispatch(new UpdateProjectAction({ id: this.id, changes: { status: ProjectStatus.PUBLISHED, active: true }}, {
        success: () => {
          this.store.dispatch(new AddToast({ description: 'Project Activation' }));
          this.popupService.close(`project-activate-${this.id}`);
        },
        failure: () => {
          this.store.dispatch(new AddToast({ description: 'Project Activation', type: ToastEnum.ERROR }));
        }
      }));
    });
  }

  deactivate() {
    Toast.warn(this.store, 'Click continue to deactivate project', ['Continue'], () => {
      this.store.dispatch(new UpdateProjectAction({ id: this.id, changes: { status: ProjectStatus.DRAFT, active: false }}, {
        success: () => {
          this.store.dispatch(new AddToast({ description: 'Project Deactivation' }));
          this.popupService.close(`project-deactivate-${this.id}`);
        },
        failure: () => {
          this.store.dispatch(new AddToast({ description: 'Project Deactivation', type: ToastEnum.ERROR }));
        }
      }));
    });
  }

  likeToggle(){
    const likes = toggleList([...this.project.likes], this.auth.id);    
    this.store.dispatch(new UpdateProjectAction({ id: this.id, changes: { likes } }));
  }

  bookmarkToggle(){
    const bookmarks = toggleList([...this.project.bookmarks], this.auth.id);    
    this.store.dispatch(new UpdateProjectAction({ id: this.id, changes: { bookmarks } }));
  }

  updatePrivacy(data: Privacy) {
    this.store.dispatch(new UpdateProjectAction({ id: this.id, changes: { privacy: data } }));
  }

  updateSharedList(list: string[]){    
    const shares = this.project.shares + list.length;
    this.store.dispatch(new UpdateProjectAction({ id: this.id, changes: { shares } }));
  }
}
