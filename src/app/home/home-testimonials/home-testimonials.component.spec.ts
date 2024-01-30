import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeTestimonialsComponent } from './home-testimonials.component';
import { ComponentsModule } from 'src/app/components/components.module';

describe('HomeTestimonialsComponent', () => {
  let component: HomeTestimonialsComponent;
  let fixture: ComponentFixture<HomeTestimonialsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HomeTestimonialsComponent],
      imports: [ComponentsModule]
    });
    fixture = TestBed.createComponent(HomeTestimonialsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
