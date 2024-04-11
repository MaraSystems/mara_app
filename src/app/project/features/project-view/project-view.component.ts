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

@Component({
  selector: 'app-project-view',
  templateUrl: './project-view.component.html',
  styleUrls: ['./project-view.component.scss']
})
export class ProjectViewComponent extends UnSubscriber implements OnInit {
  project = new Project();
  deliverables: ProjectDeliverable[] = [];
  id!: string;
  price!: string;
  duration!: number;

  moreList: More[] = [
    { name: 'Update Project', icon: '', popup: 'project-update' },
    { name: 'Publish Project', icon: '' },
    { name: 'Unpublish Project', icon: '' },
    { name: 'Delete Project', icon: '', popup: 'project-delete' }
  ]

  constructor(
    public store: Store<AppState>,
    private activatedRoute: ActivatedRoute,
    public popupService: PopupService,
    private cdr: ChangeDetectorRef
  ){
    super();
  }

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.paramMap.get('id') as string;   
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
    });
  }

  deleteProject() {
    this.store.dispatch(new DeleteProjectAction(this.id));
  }
}
