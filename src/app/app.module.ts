import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { appEffects, appReducers } from './app.state';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { HttpClientModule } from '@angular/common/http';
import { ToastModule } from './general/features/toast/features/toast.module';
import { SidebarModule } from './general/features/sidebar/sidebar.module';
import { NavbarModule } from './general/features/navbar/navbar.module';
import { FootbarModule } from './general/features/footbar/footbar.module';
import { NotfoundModule } from './notfound/notfound.module';
import { PopupModule } from './general/features/popup/features/popup.module';
import { PopupService } from './general/features/popup/features/popup.service';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PopupModule,
    StoreModule.forRoot(appReducers),
    StoreDevtoolsModule.instrument({ name: 'Contractor' }),
    EffectsModule.forRoot(appEffects),
    HttpClientModule,
    ToastModule,
    SidebarModule,
    NavbarModule,
    FootbarModule,
    NotfoundModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
