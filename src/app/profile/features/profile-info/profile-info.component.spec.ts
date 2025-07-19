import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileInfoComponent } from './profile-info.component';
import { Store, StoreModule } from '@ngrx/store';
import { RouterTestingModule } from '@angular/router/testing';
import { KeyvalueComponent } from 'src/app/general/ui/keyvalue/keyvalue.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { appEffects, appReducers } from 'src/app/app.state';
import { TestsService } from 'src/tests/tests.service';
import { DebugElement, inject } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { HttpClientModule } from '@angular/common/http';
import { By } from '@angular/platform-browser';
import { selectAuthClient } from 'src/app/users/utils/store/client-store.selector';

describe('ProfileInfoComponent', () => {
  let component: ProfileInfoComponent;
  let fixture: ComponentFixture<ProfileInfoComponent>;
  let testsService: TestsService;
  let el: DebugElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProfileInfoComponent, KeyvalueComponent],
      imports: [
        StoreModule.forRoot(appReducers),
        EffectsModule.forRoot(appEffects),
        HttpClientModule,
        RouterTestingModule,
        ReactiveFormsModule,
        FormsModule
      ],
      providers: [
        Store,
      ]
    }).runInInjectionContext(() => {
      testsService = inject(TestsService);
      testsService.registerClient();
      testsService.login();
    });

    fixture = TestBed.createComponent(ProfileInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    el = fixture.debugElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update data on form update', () => {
    component.form.controls['username'].setValue('sample');
    fixture.detectChanges();
    expect(component.updateData).toEqual(jasmine.objectContaining({ username: 'sample' }));
  });

  it('should disable update button when form is invalid', () => {
    component.edit = true;
    component.form.controls['email'].setValue('me');
    fixture.detectChanges();
    const button = el.query(By.css('#update'));
    expect(button.nativeElement.disabled).toEqual(true);
  });

  it('should call updateClient', () => {
    component.edit = true;
    component.form.controls['email'].setValue('me@mail.com');
    const updateSpy = spyOn(component, 'updateClient');
    fixture.detectChanges();
    const button = el.query(By.css('#update'));
    button.nativeElement.click();
    fixture.detectChanges();
    expect(updateSpy).toHaveBeenCalled();
  });

  it('should update client', (done: any) => {
    component.edit = true;
    component.form.controls['email'].setValue('another@mail.com');
    fixture.detectChanges();
    const button = el.query(By.css('#update'));
    button.nativeElement.click();
    fixture.detectChanges();
    component.newSubscription = component.store.select(selectAuthClient).subscribe(client => {
      expect(client).toEqual(jasmine.objectContaining({ email: 'another@mail.com'}));
      done();
    });
  });
});
