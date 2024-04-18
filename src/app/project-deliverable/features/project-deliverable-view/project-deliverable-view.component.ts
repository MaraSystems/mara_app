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
import { DocumentData } from 'src/app/shared/utils/models/document-data';
import { ListDocumentsAction } from 'src/app/shared/utils/store/document/document-store.action';
import { selectDocumentByModelId } from 'src/app/shared/utils/store/document/document-store.selector';

@Component({
  selector: 'app-project-deliverable-view',
  templateUrl: './project-deliverable-view.component.html',
  styleUrls: ['./project-deliverable-view.component.scss']
})
export class ProjectDeliverableViewComponent extends UnSubscriber implements OnInit {
  projectDeliverable = new ProjectDeliverable();
  documents: DocumentData[] = [];
  id!: string;

  moreList: More[] = [
    { name: 'Update', icon: 'update', popup: 'project-deliverable-update' },
    { name: 'Delete', icon: 'delete', popup: 'project-deliverable-delete' }
  ]

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
    this.store.dispatch(new ListDocumentsAction('project-document', this.id));
    
    this.newSubscription = this.store.select(selectProjectDeliverableById(this.id)).subscribe(projectDeliverable => {
      this.projectDeliverable = projectDeliverable;            
    });
  }

  deleteProjectDeliverable() {
    this.store.dispatch(new DeleteProjectDeliverableAction(this.id));
  }
}
