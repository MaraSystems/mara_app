import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KinComponent } from './kin.component';
import { Store, StoreModule } from '@ngrx/store';
import { RouterTestingModule } from '@angular/router/testing';
import { KeyvalueModule } from 'src/app/general/ui/keyvalue/keyvalue.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { appEffects, appReducers } from 'src/app/app.state';
import { TestsService } from 'src/tests/tests.service';
import { DebugElement, inject } from '@angular/core';
import { By } from '@angular/platform-browser';
import { selectKinByUserId } from '../utils/store/kin-store.selector';
import { Auth } from 'src/app/auth/utils/models/auth.model';
import { EffectsModule } from '@ngrx/effects';
import { HttpClientModule } from '@angular/common/http';

describe('KinComponent', () => {
  let component: KinComponent;
  let fixture: ComponentFixture<KinComponent>;
  let testsService: TestsService;
  let el: DebugElement;
  let auth: Auth;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [KinComponent],
      providers: [
        Store
      ],
      imports: [
        StoreModule.forRoot(appReducers),
        EffectsModule.forRoot(appEffects),
        HttpClientModule,
        RouterTestingModule,
        KeyvalueModule,
        ReactiveFormsModule,
        FormsModule
      ]
    }).runInInjectionContext(() => {
      testsService = inject(TestsService);
      testsService.registerClient();
      testsService.login();      
    });

    fixture = TestBed.createComponent(KinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    el = fixture.debugElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update data on form update', () => {
    component.edit = true;
    component.form.controls['firstname'].setValue('sample');
    fixture.detectChanges();
    expect(component.updateData).toEqual(jasmine.objectContaining({ firstname: 'sample' }));
  });

  it('should disable update button when form is invalid', () => {
    component.edit = true;
    component.form.controls['email'].setValue('me');
    fixture.detectChanges();    
    const button = el.query(By.css('#update'));
    expect(button.nativeElement.disabled).toEqual(true);
  });

  it('should call saveChanges', () => {
    component.edit = true;
    component.form.controls['email'].setValue('kin@mail.com');
    component.form.controls['phone'].setValue('1234567890');
    component.form.controls['relationship'].setValue('Bro');
    const saveSpy = spyOn(component, 'saveChanges');
    fixture.detectChanges();
    const button = el.query(By.css('#update'));
    button.nativeElement.click();
    fixture.detectChanges();
    expect(saveSpy).toHaveBeenCalled();
  });

  it('should update kin', (done: any) => {
    component.edit = true;
    component.form.controls['email'].setValue('kin@mail.com');
    component.form.controls['phone'].setValue('1234567890');
    component.form.controls['relationship'].setValue('Bro');    
    fixture.detectChanges();
    const button = el.query(By.css('#update'));
    button.nativeElement.click();
    fixture.detectChanges();  
    
    component.newSubscription = component.store.select(selectKinByUserId(component.userId)).subscribe(kin => {
      expect(kin).toEqual(jasmine.objectContaining({ email: 'kin@mail.com'}));
      done();
    });
  });
});
