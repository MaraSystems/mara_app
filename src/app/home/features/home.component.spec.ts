import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';
import { HomeValuesComponent } from './ui/home-values/home-values.component';
import { HomeBenefitsComponent } from './ui/home-benefits/home-benefits.component';
import { HomeFeaturesComponent } from './ui/home-features/home-features.component';
import { HomeFooterComponent } from './ui/home-footer/home-footer.component';
import { HomeTestimonialsComponent } from './ui/home-testimonials/home-testimonials.component';
import { HomeWorksComponent } from './ui/home-works/home-works.component';
import { ComponentsModule } from '../shared/components.module';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let el: DebugElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        HomeComponent,
        HomeFeaturesComponent,
        HomeValuesComponent,
        HomeWorksComponent,
        HomeTestimonialsComponent,
        HomeBenefitsComponent,
        HomeFooterComponent,
      ],
      imports: [ComponentsModule]
    });
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    el = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
