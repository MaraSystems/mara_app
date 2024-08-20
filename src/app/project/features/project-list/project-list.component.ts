import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { UnSubscriber } from 'src/app/general/utils/services/unsubscriber.service';
import { selectAllProjects } from '../../utils/store/project-store.selector';
import { Project } from '../../utils/models/project';
import { ListProjectsAction } from '../../utils/store/project-store.action';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss']
})
export class ProjectListComponent extends UnSubscriber implements OnInit {
  projects: Project[] = [];

  constructor(
    public store: Store
  ){
    super();
  }

  ngOnInit(): void {
    this.store.dispatch(new ListProjectsAction({ limit: 10, skip: 0 }));
    this.newSubscription = this.store.select(selectAllProjects).subscribe(projects => {      
      this.projects = projects;
    });
  }
}
