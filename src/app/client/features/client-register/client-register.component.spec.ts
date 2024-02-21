import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientRegisterComponent } from './client-register.component';
import { Store, StoreModule } from '@ngrx/store';
import { InputComponent } from 'src/app/shared/ui/input/input.component';
import { InputModule } from 'src/app/shared/ui/input/input.module';
import { AltAuthModule } from 'src/app/auth/ui/alt-auth/alt-auth.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { appReducers } from 'src/app/app.state';

describe('ClientRegisterComponent', () => {
  let component: ClientRegisterComponent;
  let fixture: ComponentFixture<ClientRegisterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ClientRegisterComponent],
      providers: [Store],
      imports: [
        StoreModule.forRoot(appReducers),
        InputModule,
        AltAuthModule,
        ReactiveFormsModule,
        FormsModule,
        RouterTestingModule
      ]
    });
    fixture = TestBed.createComponent(ClientRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
