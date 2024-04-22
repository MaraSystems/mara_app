import { Component, OnInit } from '@angular/core';
import { UnSubscriber } from 'src/app/shared/utils/services/unsubscriber.service';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.state';
import { ActivatedRoute } from '@angular/router';
import { More } from 'src/app/shared/utils/models/more.model';
import { PopupService } from 'src/app/shared/features/popup/features/popup.service';
import { ProjectDeliverable } from '../../utils/models/project-deliverable.model';
import { DeleteProjectDeliverableAction, GetProjectDeliverableAction, UpdateProjectDeliverableAction } from '../../utils/store/project-deliverable-store.action';
import { selectProjectDeliverableById } from '../../utils/store/project-deliverable-store.selector';
import { Attachment } from 'src/app/shared/features/attachment/utils/models/attatchment.model';
import { ListAttachmentsAction } from 'src/app/shared/features/attachment/utils/store/attatchment-store.action';
import { toggleList } from 'src/app/shared/utils/lib/toggleList';
import { selectActiveAuth } from 'src/app/auth/utils/store/auth-store.selector';
import { Auth } from 'src/app/auth/utils/models/auth.model';

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
  moreList: More[] = [];

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
      
      this.newSubscription = this.store.select(selectActiveAuth).subscribe(auth => {
        this.auth = auth;
        this.liked = this.deliverable.likes.includes(this.auth.id);      
      }); 
    });

    this.moreList = [
      { name: 'Update', icon: 'update', popup: `project-deliverable-update-${this.id}` },
      { name: 'Delete', icon: 'Delete', popup: `project-deliverable-delete-${this.id}` }
    ];
  }

  delete() {
    this.store.dispatch(new DeleteProjectDeliverableAction(this.id));
  }

  likeToggle(){
    const likes = toggleList([...this.deliverable.likes], this.auth.id);    
    this.store.dispatch(new UpdateProjectDeliverableAction({ id: this.id, changes: { likes } }, { loud: false }));
  }
}
