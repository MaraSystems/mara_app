import { TestBed } from '@angular/core/testing';

import { AccessService } from 'src/app/general/utils/services/access.service';
import { HttpClientModule } from '@angular/common/http';
import { AttachmentAccessService } from './attachment-access.service';

describe('AttachmentAccessService', () => {
  let service: AttachmentAccessService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AccessService
      ],
      imports: [
        HttpClientModule
      ]
    });
    service = TestBed.inject(AttachmentAccessService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
