import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Project } from '../../utils/models/project.model';
import { UnSubscriber } from 'src/app/shared/utils/services/unsubscriber.service';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.state';
import { selectProjectById } from '../../utils/store/project-store.selector';
import { ActivatedRoute } from '@angular/router';
import { DeleteProjectAction, GetProjectAction, UpdateProjectAction } from '../../utils/store/project-store.action';
import { More } from 'src/app/shared/utils/models/more.model';
import { PopupService } from 'src/app/shared/features/popup/features/popup.service';
import { selectAllProjectDeliverables } from 'src/app/project-deliverable/utils/store/project-deliverable-store.selector';
import { ProjectDeliverable } from 'src/app/project-deliverable/utils/models/project-deliverable.model';
import { ListProjectDeliverablesAction } from 'src/app/project-deliverable/utils/store/project-deliverable-store.action';
import { ProjectStatus } from '../../utils/models/project-status.enum';
import { AddToast } from 'src/app/shared/features/toast/utils/store/toast.action';
import { Toast } from 'src/app/shared/features/toast/features/toast.model';
import { selectActiveAuth } from 'src/app/auth/utils/store/auth-store.selector';
import { Auth } from 'src/app/auth/utils/models/auth.model';
import { toggleList } from 'src/app/shared/utils/lib/toggleList';
import { CommentEnum } from 'src/app/shared/features/comment/utils/models/comment.enum';

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

    this.moreList = [
      { name: 'Update', icon: 'update', popup: `project-update-${this.id}` },
      { name: 'Activate', icon: 'publish', popup: `project-activate-${this.id}` },
      { name: 'De-Activate', icon: 'unpublished', popup: `project-deactivate-${this.id}` },
      { name: 'Delete', icon: 'Delete', popup: `project-delete-${this.id}` }
    ];

    this.popupService.open('project-comment-' + this.id)
  }

  deleteProject() {
    this.store.dispatch(new DeleteProjectAction(this.id));
  }

  activate() {
    if (this.deliverables.length === 0) {
      this.store.dispatch(new AddToast({ description: 'You can not publish a project with no deliverables', isError: true }));
      return;
    }

    this.store.dispatch(new UpdateProjectAction({ id: this.id, changes: { status: ProjectStatus.PUBLISHED, active: true }}, { modal: 'project-publish' }));
  }

  deactivate() {
    this.store.dispatch(new UpdateProjectAction({ id: this.id, changes: { status: ProjectStatus.DRAFT, active: false }}, { modal: 'project-draft'}));
  }

  likeToggle(){
    const likes = toggleList([...this.project.likes], this.auth.id);    
    this.store.dispatch(new UpdateProjectAction({ id: this.id, changes: { likes } }, { loud: false }));
  }

  bookmarkToggle(){
    const bookmarks = toggleList([...this.project.bookmarks], this.auth.id);    
    this.store.dispatch(new UpdateProjectAction({ id: this.id, changes: { bookmarks } }, { loud: false }));
  }
}
