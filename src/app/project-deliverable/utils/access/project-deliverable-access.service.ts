import { Injectable } from '@angular/core';
import { AccessService } from 'src/app/general/utils/services/access.service';
import { of } from 'rxjs';
import { Update } from '@ngrx/entity';
import { ProjectDeliverable } from '../models/project-deliverable';

@Injectable({
  providedIn: 'root'
})
export class ProjectDeliverableAccessService {
  domain = 'project-deliverables';

  constructor(
    private accessService: AccessService
  ) {}

  createProjectDeliverable(data: ProjectDeliverable) {        
    const response = this.accessService.insertOne<ProjectDeliverable>(this.domain, data);    
    return response;
  }

  getProjectDeliverable(id: string) {    
    const response = this.accessService.findOne<ProjectDeliverable>(this.domain, { _id: id });
    return response;
  }

  listProjectDeliverables(projectId: string, limit = 10, skip = 0) {
    const response = this.accessService.find<[ProjectDeliverable]>(this.domain, { projectId, hidden: false });    
    return response;
  }

  updateProjectDeliverable(data: Update<ProjectDeliverable>) {        
    const response = this.accessService.updateOne<ProjectDeliverable>(this.domain, { _id: data.id }, data.changes);
    return response;
  }

  deleteProjectDeliverable(id: string) {    
    const response = this.accessService.updateOne<ProjectDeliverable>(this.domain, { _id: id }, { hidden: true });
    return response;
  }
}
