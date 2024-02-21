import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileInfoComponent } from './profile-info.component';
import { Store, StoreModule } from '@ngrx/store';
import { RouterTestingModule } from '@angular/router/testing';
import { KeyvalueComponent } from 'src/app/shared/ui/keyvalue/keyvalue.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { appReducers } from 'src/app/app.state';

describe('ProfileInfoComponent', () => {
  let component: ProfileInfoComponent;
  let fixture: ComponentFixture<ProfileInfoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProfileInfoComponent, KeyvalueComponent],
      imports: [
        StoreModule.forRoot(appReducers),
        RouterTestingModule,
        ReactiveFormsModule,
        FormsModule
      ],
      providers: [
        Store,
      ]
    });
    fixture = TestBed.createComponent(ProfileInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
