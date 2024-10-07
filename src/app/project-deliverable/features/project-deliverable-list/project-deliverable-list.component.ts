import { Component, OnInit } from '@angular/core';
import { BaseComponent } from 'src/app/general/utils/services/basecomponent.service';
import { Store } from '@ngrx/store';
import { ActivatedRoute } from '@angular/router';
import { ProjectDeliverable } from '../../utils/models/project-deliverable';
import { ListProjectDeliverablesAction } from '../../utils/store/project-deliverable-store.action';
import { selectAllProjectDeliverables } from '../../utils/store/project-deliverable-store.selector';

@Component({
  selector: 'app-project-deliverable-list',
  templateUrl: './project-deliverable-list.component.html',
  styleUrls: ['./project-deliverable-list.component.scss']
})
export class ProjectDeliverableListComponent extends BaseComponent implements OnInit{
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
