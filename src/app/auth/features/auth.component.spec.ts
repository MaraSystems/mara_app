import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthComponent } from './auth.component';
import { Store, StoreModule } from '@ngrx/store';
import { InputModule } from 'src/app/shared/ui/input/input.module';
import { PasswordModule } from '../ui/password/password.module';
import { AltAuthModule } from '../ui/alt-auth/alt-auth.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { appReducers } from 'src/app/app.state';

describe('AuthComponent', () => {
  let component: AuthComponent;
  let fixture: ComponentFixture<AuthComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AuthComponent],
      providers: [Store],
      imports: [
        StoreModule.forRoot(appReducers),
        InputModule,
        PasswordModule,
        AltAuthModule,
        ReactiveFormsModule,
        FormsModule,
        RouterTestingModule
      ]
    });
    fixture = TestBed.createComponent(AuthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
