import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { Store, StoreModule } from '@ngrx/store';
import { HttpClientModule } from '@angular/common/http';
import { ToastModule } from './general/features/toast/features/toast.module';
import { appReducers } from './app.state';

describe('AppComponent', () => {
  let app: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  
  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        StoreModule.forRoot(appReducers),
        HttpClientModule,
        ToastModule
      ],
      providers: [Store],
      declarations: [AppComponent]
    });
    fixture = TestBed.createComponent(AppComponent);
    app = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(app).toBeTruthy();
  });
});
