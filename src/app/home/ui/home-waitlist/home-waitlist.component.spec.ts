import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeWaitlistComponent } from './home-waitlist.component';

describe('HomeWaitlistComponent', () => {
  let component: HomeWaitlistComponent;
  let fixture: ComponentFixture<HomeWaitlistComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HomeWaitlistComponent],
    });
    fixture = TestBed.createComponent(HomeWaitlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
