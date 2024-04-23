import { TestBed } from '@angular/core/testing';

import { UnSubscriber } from './unsubscriber.service';

describe('UnSubscriber', () => {
  let service: UnSubscriber;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UnSubscriber);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
