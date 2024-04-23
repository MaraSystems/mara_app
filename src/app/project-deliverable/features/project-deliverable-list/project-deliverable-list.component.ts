import { Component, OnInit } from '@angular/core';
import { UnSubscriber } from 'src/app/general/utils/services/unsubscriber.service';
import { Store } from '@ngrx/store';
import { ActivatedRoute } from '@angular/router';
import { ProjectDeliverable } from '../../utils/models/project-deliverable.model';
import { ListProjectDeliverablesAction } from '../../utils/store/project-deliverable-store.action';
import { selectAllProjectDeliverables } from '../../utils/store/project-deliverable-store.selector';

@Component({
  selector: 'app-project-deliverable-list',
  templateUrl: './project-deliverable-list.component.html',
  styleUrls: ['./project-deliverable-list.component.scss']
})
export class ProjectDeliverableListComponent extends UnSubscriber implements OnInit{
  deliverables: ProjectDeliverable[] = [];
  id: string = '';
  
  constructor(
    public store: Store,
    public activatedRoute: ActivatedRoute
  ){
    super();
  }

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.paramMap.get('project_id') as string;    
    this.store.dispatch(new ListProjectDeliverablesAction(this.id, { limit: 10, skip: 1 }));

    this.newSubscription = this.store.select(selectAllProjectDeliverables(this.id)).subscribe(deliverables => {      
      this.deliverables = deliverables;            
    });
  }
}
