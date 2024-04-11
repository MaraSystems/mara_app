import { Injectable } from '@angular/core';
import { AccessService } from 'src/app/shared/utils/services/access.service';
import { Collection } from '@black-ink/lonedb';
import { DataResponse } from 'src/app/shared/utils/models/data-response';
import { of } from 'rxjs';
import { Update } from '@ngrx/entity';
import { Project } from '../models/project.model';
import { ListPayload } from 'src/app/shared/utils/models/list-payload';
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
    const response = this.accessService.insert<Project>(this.domain, data);
    return response;
  }

  getProject(id: string) {    
    const response = this.accessService.get<Project>(this.domain, { _id: id });
    return response;
  }

  listProjects(data: ListPayload) {
    const response = this.accessService.list<[Project]>(this.domain, { status: ProjectStatus.DRAFT });
    return response;
  }

  updateProject(data: Update<Project>) {    
    const response = this.accessService.update<Project>(this.domain, { _id: data.id }, data.changes);
    return response;
  }

  deleteProject(id: string) {    
    const response = this.accessService.update<Project>(this.domain, { _id: id }, { status: ProjectStatus.DELETED });
    return response;
  }
}
