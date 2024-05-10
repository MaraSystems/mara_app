import { Injectable } from '@angular/core';
import { AccessService } from 'src/app/general/utils/services/access.service';
import { Update } from '@ngrx/entity';
import { Project } from '../models/project.model';
import { ListOptions } from 'src/app/general/utils/models/list-options';
import { ProjectStatus } from '../models/project-status.enum';

@Injectable({
  providedIn: 'root'
})
export class ProjectAccessService {
  domain = 'projects';

  constructor(
    private accessService: AccessService
  ) {}

  createProject(data: Project) {    
    const response = this.accessService.insertOne<Project>(this.domain, { 
      ...data, 
      status: ProjectStatus.DRAFT, 
      hidden: false,
      likes: [],
      bookmarks: [],
      shares: 0
    });
    return response;
  }

  getProject(id: string) {    
    const response = this.accessService.findOne<Project>(this.domain, { _id: id });
    return response;
  }

  listProjects(data: ListOptions) {
    const response = this.accessService.find<[Project]>(this.domain, { hidden: false });
    return response;
  }

  updateProject(data: Update<Project>) {    
    const response = this.accessService.updateOne<Project>(this.domain, { _id: data.id }, data.changes);
    return response;
  }

  deleteProject(id: string) {    
    const response = this.accessService.updateOne<Project>(this.domain, { _id: id }, { hidden: true });
    return response;
  }
}
