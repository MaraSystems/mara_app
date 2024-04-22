import { TestBed } from '@angular/core/testing';

import { ProjectAccessService } from './project-access.service';
import { AccessService } from 'src/app/shared/utils/services/access.service';
import { HttpClientModule } from '@angular/common/http';

describe('ProjectAccessService', () => {
  let service: ProjectAccessService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AccessService
      ],
      imports: [
        HttpClientModule
      ]
    });
    service = TestBed.inject(ProjectAccessService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
