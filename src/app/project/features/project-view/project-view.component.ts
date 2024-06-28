import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Project } from '../../utils/models/project.model';
import { UnSubscriber } from 'src/app/general/utils/services/unsubscriber.service';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.state';
import { selectProjectById } from '../../utils/store/project-store.selector';
import { ActivatedRoute, Router } from '@angular/router';
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
import { Privacy } from 'src/app/general/features/share/utils/models/privacy';
import { ContractRequest } from 'src/app/contract/utils/models/contract.model';
import { CreateContractAction } from 'src/app/contract/utils/store/contract-store.action';
import { summerizeDeliverables } from 'src/app/general/utils/lib/summerizeDeliverables';

@Component({
  selector: 'app-project-view',
  templateUrl: './project-view.component.html',
  styleUrls: ['./project-view.component.scss']
})
export class ProjectViewComponent extends UnSubscriber implements OnInit {
  auth!: Auth;
  project!: Project;
  deliverables: ProjectDeliverable[] = [];
  selectedDeliverables: string[] = [];
  id!: string;
  price!: string;
  duration!: number;

  moreList: More[] = [];

  liked = false;
  bookmarked = false;
  commentModel = CommentEnum.PROJECT;
  shareModel = ShareEnum.PROJECT;
  commentsCount = 0;
  projectStatus = ProjectStatus;

  constructor(
    public store: Store<AppState>,
    private activatedRoute: ActivatedRoute,
    public popupService: PopupService,
    private cdr: ChangeDetectorRef,
  ){
    super();
  }

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.paramMap.get('project_id') as string;   
    this.store.dispatch(new GetProjectAction(this.id)); 
    this.store.dispatch(new ListProjectDeliverablesAction(this.id));

    this.newSubscription = this.store.select(selectAllProjectDeliverables(this.id)).subscribe(deliverables => {
      this.deliverables = deliverables;
      this.toggleDeliverableList(true);
    });
    
    this.newSubscription = this.store.select(selectProjectById(this.id)).subscribe(project => {
      this.project = project;             

      if (this.project) {
        this.newSubscription = this.store.select(selectActiveAuth).subscribe(auth => {
          this.auth = auth;
          this.liked = this.project.likes.includes(this.auth.id);      
          this.bookmarked = this.project.bookmarks.includes(this.auth.id);   
          
          const activation = this.project.status === ProjectStatus.DRAFT 
            ? { name: 'Activate', icon: 'publish', action: () => { this.activate() } }
            : { name: 'De-Activate', icon: 'unpublished',action: () => { this.deactivate() } };

          this.moreList = auth.id === this.project.userId
            ? this.moreList = [
              { name: 'Update', icon: 'update', popup: `project-update-${this.id}` },
              { name: 'Delete', icon: 'Delete', action: () => { this.deleteProject() } },
              activation
            ]
            : [];
            });         
      }    
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

  requestContract() {
    const contract: ContractRequest = { deliverables: this.selectedDeliverables, clientId: this.auth.id, projectId: this.id };
    this.store.dispatch(new CreateContractAction(contract, {
      success: () => {
        this.store.dispatch(new AddToast({ description: 'Contract Request Successful' }));
        // this.router.navigateByUrl('/contracts');
      },
      failure: () => {
        this.store.dispatch(new AddToast({ description: 'Contract Request Failed' }));
      }
    }));
  }

  summerize() {
    const summery = summerizeDeliverables(this.deliverables, this.selectedDeliverables);
    this.price = summery.price;
    this.duration = summery.duration;

    this.cdr.detectChanges();
  }

  toggleDeliverable(id: string) {
    this.selectedDeliverables = toggleList(this.selectedDeliverables, id);
    this.summerize();
  }

  toggleDeliverableList(flag = false) {
    this.selectedDeliverables = flag
      ? this.deliverables.map(d => d._id)
      : [];    

    this.summerize();
  }
}
