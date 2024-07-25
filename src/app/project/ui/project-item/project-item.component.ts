import { Component, Input, OnInit } from '@angular/core';
import { Project } from '../../utils/models/project.model';
import { GetProjectAction } from '../../utils/store/project-store.action';
import { ListProjectDeliverablesAction } from 'src/app/project-deliverable/utils/store/project-deliverable-store.action';
import { selectAllProjectDeliverables } from 'src/app/project-deliverable/utils/store/project-deliverable-store.selector';
import { Store } from '@ngrx/store';
import { UnSubscriber } from 'src/app/general/utils/services/unsubscriber.service';
import { summerizeDeliverables } from 'src/app/general/utils/lib/summerizeDeliverables';

@Component({
  selector: 'app-project-item',
  templateUrl: './project-item.component.html',
  styleUrls: ['./project-item.component.scss']
})
export class ProjectItemComponent extends UnSubscriber implements OnInit {
  @Input() project!: Project;
  price!: string;
  duration!: number;

  constructor(
    public store: Store
  ){
    super();
  }

  ngOnInit(): void {
    this.store.dispatch(new GetProjectAction(this.project._id)); 
    this.store.dispatch(new ListProjectDeliverablesAction(this.project._id));

    this.newSubscription = this.store.select(selectAllProjectDeliverables(this.project._id)).subscribe(deliverables => {
      const summary = summerizeDeliverables(deliverables);            
      this.price = summary.price;
      this.duration = summary.duration;
    });
  }
}
