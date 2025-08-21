import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { appEffects, appReducers } from './app.state';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { HttpClientModule } from '@angular/common/http';
import { FootbarModule } from './general/features/footbar/footbar.module';
import { NotfoundModule } from './notfound/notfound.module';
import { PopupModule, ToastModule } from 'mara-ng';


@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PopupModule,
    StoreModule.forRoot(appReducers),
    StoreDevtoolsModule.instrument({ name: 'Mara Systems' }),
    EffectsModule.forRoot(appEffects),
    HttpClientModule,
    ToastModule,
    FootbarModule,
    NotfoundModule,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
