import { TestBed } from '@angular/core/testing';

import { BaseComponent } from './basecomponent.service';

describe('BaseComponent', () => {
  let service: BaseComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BaseComponent);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
