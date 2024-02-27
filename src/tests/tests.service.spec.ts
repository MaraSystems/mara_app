import { TestBed } from '@angular/core/testing';

import { TestsService } from './tests.service';
import { StoreModule } from '@ngrx/store';
import { appEffects, appReducers } from 'src/app/app.state';
import { EffectsModule } from '@ngrx/effects';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';

describe('TestsService', () => {
  let service: TestsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot(appReducers),
        EffectsModule.forRoot(appEffects),
        HttpClientModule,
        RouterTestingModule
      ]
    });
    service = TestBed.inject(TestsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
