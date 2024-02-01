import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { HomeValuesComponent } from '../ui/home-values/home-values.component';
import { HomeWorksComponent } from '../ui/home-works/home-works.component';
import { HomeTestimonialsComponent } from '../ui/home-testimonials/home-testimonials.component';
import { HomeBenefitsComponent } from '../ui/home-benefits/home-benefits.component';
import { HomeFooterComponent } from '../ui/home-footer/home-footer.component';
import { HomeFeaturesComponent } from '../ui/home-features/home-features.component';
import { HomeRoutingModule } from './home-routing.module';
import { SwitcherModule } from 'src/app/shared/ui/switcher/switcher.module';



@NgModule({
  declarations: [
    HomeComponent,
    HomeFeaturesComponent,
    HomeValuesComponent,
    HomeWorksComponent,
    HomeTestimonialsComponent,
    HomeBenefitsComponent,
    HomeFooterComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    SwitcherModule
  ],
  exports: [
    HomeComponent
  ]
})
export class HomeModule { }
