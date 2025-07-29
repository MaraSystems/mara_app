import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { HomeValuesComponent } from '../ui/home-values/home-values.component';
import { HomeWorksComponent } from '../ui/home-works/home-works.component';
import { HomeWaitlistComponent } from '../ui/home-waitlist/home-waitlist.component';
import { HomeBenefitsComponent } from '../ui/home-benefits/home-benefits.component';
import { HomeFooterComponent } from '../ui/home-footer/home-footer.component';
import { HomeFeaturesComponent } from '../ui/home-features/home-features.component';
import { HomeRoutingModule } from './home-routing.module';
import { ButtonModule } from 'src/app/general/ui/button/button.module';
import { HomeHeaderComponent } from '../ui/home-header/home-header.component';
import { TextInputModule } from 'src/app/general/ui/text-input/text-input.module';
import { TextAreaModule } from 'src/app/general/ui/text-area/text-area.module';
import { BotModule } from 'src/app/general/features/bot/features/bot.module';



@NgModule({
  declarations: [
    HomeComponent,
    HomeFeaturesComponent,
    HomeHeaderComponent,
    HomeValuesComponent,
    HomeWorksComponent,
    HomeWaitlistComponent,
    HomeBenefitsComponent,
    HomeFooterComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    ButtonModule,
    TextInputModule,
    TextAreaModule,
    BotModule
  ],
  exports: [
    HomeComponent
  ]
})
export class HomeModule { }
