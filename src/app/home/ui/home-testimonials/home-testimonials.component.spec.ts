import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeTestimonialsComponent } from './home-testimonials.component';
import { SwitcherModule } from 'src/app/general/ui/switcher/switcher.module';

describe('HomeTestimonialsComponent', () => {
  let component: HomeTestimonialsComponent;
  let fixture: ComponentFixture<HomeTestimonialsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HomeTestimonialsComponent],
      imports: [
        SwitcherModule
      ]
    });
    fixture = TestBed.createComponent(HomeTestimonialsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
