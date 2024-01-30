import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeValuesComponent } from './home-values.component';
import { ComponentsModule } from 'src/app/components/components.module';

describe('HomeValuesComponent', () => {
  let component: HomeValuesComponent;
  let fixture: ComponentFixture<HomeValuesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HomeValuesComponent],
      imports: [ComponentsModule]
    });
    fixture = TestBed.createComponent(HomeValuesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
