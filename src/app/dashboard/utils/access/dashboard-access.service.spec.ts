import { TestBed } from '@angular/core/testing';

import { DashboardAccessService } from './dashboard-access.service';
import { AccessService } from 'src/app/general/utils/services/access.service';
import { HttpClientModule } from '@angular/common/http';

describe('DashboardAccessService', () => {
  let service: DashboardAccessService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AccessService
      ],
      imports: [
        HttpClientModule
      ]
    });
    service = TestBed.inject(DashboardAccessService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
