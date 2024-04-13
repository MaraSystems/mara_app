import { Injectable } from '@angular/core';
import { AccessService } from 'src/app/shared/utils/services/access.service';
import { of } from 'rxjs';
import { Update } from '@ngrx/entity';
import { ProjectDeliverable } from '../models/project-deliverable.model';

@Injectable({
  providedIn: 'root'
})
export class ProjectDeliverableAccessService {
  domain = 'project-deliverables';

  constructor(
    private accessService: AccessService
  ) {}

  createProjectDeliverable(data: ProjectDeliverable) {        
    const response = this.accessService.insert<ProjectDeliverable>(this.domain, { ...data, hidden: false });    
    return response;
  }

  getProjectDeliverable(id: string) {    
    const response = this.accessService.get<ProjectDeliverable>(this.domain, { _id: id });
    return response;
  }

  listProjectDeliverables(projectId: string, limit = 10, skip = 0) {
    const response = this.accessService.list<[ProjectDeliverable]>(this.domain, { projectId, hidden: false });    
    return response;
  }

  updateProjectDeliverable(data: Update<ProjectDeliverable>) {        
    const response = this.accessService.update<ProjectDeliverable>(this.domain, { _id: data.id }, data.changes);
    return response;
  }

  deleteProjectDeliverable(id: string) {    
    const response = this.accessService.update<ProjectDeliverable>(this.domain, { _id: id }, { hidden: true });
    return response;
  }
}
