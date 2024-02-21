import { TestBed } from '@angular/core/testing';

import { AuthAccessService } from './auth-access.service';
import { AccessService } from 'src/app/shared/utils/services/access.service';
import { Store, StoreModule } from '@ngrx/store';
import { HttpClientModule } from '@angular/common/http';
import { appReducers } from 'src/app/app.state';

describe('AuthAccessService', () => {
  let service: AuthAccessService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AccessService,
        Store
      ],
      imports: [
        StoreModule.forRoot(appReducers),
        HttpClientModule
      ]
    });
    service = TestBed.inject(AuthAccessService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
