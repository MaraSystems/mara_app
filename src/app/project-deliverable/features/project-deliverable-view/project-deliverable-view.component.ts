import { Component, OnInit } from '@angular/core';
import { UnSubscriber } from 'src/app/shared/utils/services/unsubscriber.service';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.state';
import { ActivatedRoute } from '@angular/router';
import { More } from 'src/app/shared/utils/models/more.model';
import { PopupService } from 'src/app/shared/features/popup/features/popup.service';
import { ProjectDeliverable } from '../../utils/models/project-deliverable.model';
import { DeleteProjectDeliverableAction, GetProjectDeliverableAction } from '../../utils/store/project-deliverable-store.action';
import { selectProjectDeliverableById } from '../../utils/store/project-deliverable-store.selector';
import { Attatchment } from 'src/app/shared/features/attatchment/utils/models/attatchment.model';
import { ListAttatchmentsAction } from 'src/app/shared/features/attatchment/utils/store/attatchment-store.action';

@Component({
  selector: 'app-project-deliverable-view',
  templateUrl: './project-deliverable-view.component.html',
  styleUrls: ['./project-deliverable-view.component.scss']
})
export class ProjectDeliverableViewComponent extends UnSubscriber implements OnInit {
  projectDeliverable = new ProjectDeliverable();
  attatchment: Attatchment[] = [];
  id!: string;

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
    this.store.dispatch(new ListAttatchmentsAction('project-document', this.id));
    
    this.newSubscription = this.store.select(selectProjectDeliverableById(this.id)).subscribe(projectDeliverable => {
      this.projectDeliverable = projectDeliverable;            
    });

    this.moreList = [
      { name: 'Update', icon: 'update', popup: `project-deliverable-update-${this.id}` },
      { name: 'Delete', icon: 'Delete', popup: `project-deliverable-delete-${this.id}` }
    ];
  }

  deleteProjectDeliverable() {
    this.store.dispatch(new DeleteProjectDeliverableAction(this.id));
  }
}
