import { TestBed } from '@angular/core/testing';

import { NotificationAccessService } from './notification-access.service';
import { AccessService } from 'src/app/general/utils/services/access.service';
import { HttpClientModule } from '@angular/common/http';

describe('NotificationAccessService', () => {
  let service: NotificationAccessService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AccessService
      ],
      imports: [
        HttpClientModule
      ]
    });
    service = TestBed.inject(NotificationAccessService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
