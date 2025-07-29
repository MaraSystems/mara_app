import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';
import { HomeBenefitsComponent } from '../ui/home-benefits/home-benefits.component';
import { HomeFeaturesComponent } from '../ui/home-features/home-features.component';
import { HomeFooterComponent } from '../ui/home-footer/home-footer.component';
import { HomeTestimonialsComponent } from '../ui/home-waitlist/home-testimonials.component';
import { HomeWorksComponent } from '../ui/home-works/home-works.component';
import { HomeValuesComponent } from '../ui/home-values/home-values.component';
import { SwitcherModule } from 'src/app/general/ui/switcher/switcher.module';
import { RouterTestingModule } from '@angular/router/testing';
import { Store, StoreModule } from '@ngrx/store';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

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
      providers: [
        Store
      ],
      imports: [
        SwitcherModule,
        RouterTestingModule,
        StoreModule.forRoot()
      ]
    });
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
