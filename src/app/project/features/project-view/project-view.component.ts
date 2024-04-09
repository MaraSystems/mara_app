import { Component, OnInit } from '@angular/core';
import { Project } from '../../utils/models/project.model';
import { UnSubscriber } from 'src/app/shared/utils/services/unsubscriber.service';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.state';
import { selectProjectById } from '../../utils/store/project-store.selector';
import { ActivatedRoute } from '@angular/router';
import { GetProjectAction } from '../../utils/store/project-store.action';
import { More } from 'src/app/shared/utils/models/more.model';
import { PopupService } from 'src/app/shared/features/popup/features/popup.service';

@Component({
  selector: 'app-project-view',
  templateUrl: './project-view.component.html',
  styleUrls: ['./project-view.component.scss']
})
export class ProjectViewComponent extends UnSubscriber implements OnInit {
  project = new Project();
  id!: string;

  moreList: More[] = [
    { name: 'Update Project', icon: '', popup: 'project-update' },
    { name: 'Publish Project', icon: '' },
    { name: 'Unpublish Project', icon: '' },
    { name: 'Delete Project', icon: '' }
  ]

  constructor(
    public store: Store<AppState>,
    private activatedRoute: ActivatedRoute,
    public popupService: PopupService
  ){
    super();
  }

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.paramMap.get('id') as string;   
    this.store.dispatch(new GetProjectAction(this.id)); 
    
    this.newSubscription = this.store.select(selectProjectById(this.id)).subscribe(project => {
      this.project = project;      
    });
  }
}
