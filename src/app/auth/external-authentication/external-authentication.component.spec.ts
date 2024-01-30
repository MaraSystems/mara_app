import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExternalAuthenticationComponent } from './external-authentication.component';

describe('ExternalAuthenticationComponent', () => {
  let component: ExternalAuthenticationComponent;
  let fixture: ComponentFixture<ExternalAuthenticationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ExternalAuthenticationComponent]
    });
    fixture = TestBed.createComponent(ExternalAuthenticationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
