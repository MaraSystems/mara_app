import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeWorksComponent } from './home-works.component';
import { ComponentsModule } from 'src/app/shared/components.module';

describe('HomeWorksComponent', () => {
  let component: HomeWorksComponent;
  let fixture: ComponentFixture<HomeWorksComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HomeWorksComponent],
      imports: [ComponentsModule]
    });
    fixture = TestBed.createComponent(HomeWorksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
