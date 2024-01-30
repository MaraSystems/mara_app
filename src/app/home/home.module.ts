import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { HomeFeaturesComponent } from './home-features/home-features.component';
import { HomeValuesComponent } from './home-values/home-values.component';
import { HomeWorksComponent } from './home-works/home-works.component';
import { HomeTestimonialsComponent } from './home-testimonials/home-testimonials.component';
import { HomeBenefitsComponent } from './home-benefits/home-benefits.component';
import { HomeFooterComponent } from './home-footer/home-footer.component';
import { ComponentsModule } from '../components/components.module';



@NgModule({
  declarations: [
    HomeComponent,
    HomeFeaturesComponent,
    HomeValuesComponent,
    HomeWorksComponent,
    HomeTestimonialsComponent,
    HomeBenefitsComponent,
    HomeFooterComponent,
  ],
  imports: [
    CommonModule,
    ComponentsModule
  ],
  exports: [
    HomeComponent
  ]
})
export class HomeModule { }
