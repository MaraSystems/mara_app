import { TestBed } from '@angular/core/testing';

import { ProjectDeliverableAccessService } from './project-deliverable-access.service';
import { AccessService } from 'src/app/shared/utils/services/access.service';
import { HttpClientModule } from '@angular/common/http';

describe('ProjectDeliverableAccessService', () => {
  let service: ProjectDeliverableAccessService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AccessService
      ],
      imports: [
        HttpClientModule
      ]
    });
    service = TestBed.inject(ProjectDeliverableAccessService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
