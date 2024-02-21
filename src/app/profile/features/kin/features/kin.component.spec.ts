import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KinComponent } from './kin.component';
import { Store, StoreModule } from '@ngrx/store';
import { RouterTestingModule } from '@angular/router/testing';
import { KeyvalueModule } from 'src/app/shared/ui/keyvalue/keyvalue.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { appReducers } from 'src/app/app.state';

describe('KinComponent', () => {
  let component: KinComponent;
  let fixture: ComponentFixture<KinComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [KinComponent],
      providers: [
        Store
      ],
      imports: [
        StoreModule.forRoot(appReducers),
        RouterTestingModule,
        KeyvalueModule,
        ReactiveFormsModule,
        FormsModule
      ]
    });
    fixture = TestBed.createComponent(KinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
