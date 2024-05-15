import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientRegisterComponent } from './client-register.component';
import { Store, StoreModule } from '@ngrx/store';
import { InputModule } from 'src/app/general/ui/input/input.module';
import { AltAuthModule } from 'src/app/auth/ui/alt-auth/alt-auth.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { appEffects, appReducers } from 'src/app/app.state';
import { DebugElement, inject } from '@angular/core';
import { By } from '@angular/platform-browser';
import { selectAllClients } from '../../utils/store/client-store.selector';
import { EffectsModule } from '@ngrx/effects';
import { HttpClientModule } from '@angular/common/http';
import { AuthComponent } from 'src/app/auth/features/auth.component';
import { Database } from '@black-ink/lonedb';
import { environment } from 'src/environments/environment';
import { TestsService } from 'src/tests/tests.service';

describe('ClientRegisterComponent', () => {
  let component: ClientRegisterComponent;
  let fixture: ComponentFixture<ClientRegisterComponent>;
  let el: DebugElement;
  let testsService: TestsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ClientRegisterComponent],
      providers: [Store],
      imports: [
        StoreModule.forRoot(appReducers),
        EffectsModule.forRoot(appEffects),
        HttpClientModule,
        InputModule,
        AltAuthModule,
        ReactiveFormsModule,
        FormsModule,
        RouterTestingModule.withRoutes([
          { path: 'auth', component: AuthComponent }
        ])
      ]
    }).runInInjectionContext(() => {
      testsService = inject(TestsService);
    });
    fixture = TestBed.createComponent(ClientRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    el = fixture.debugElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update register data on form update', () => {
    component.form.controls['username'].setValue('sample');
    fixture.detectChanges();
    expect(component.registerData).toEqual(jasmine.objectContaining({ username: 'sample' }));
  });

  it('should disable register button when form is invalid', () => {
    component.form.controls['username'].setValue('sample');
    fixture.detectChanges();
    const button = el.query(By.css('.button'));
    expect(button.nativeElement.disabled).toEqual(true);
  });

  it('should register to be called', () => {
    component.form.controls['email'].setValue('me@mail.com');
    component.form.controls['phone'].setValue('1234567890');
    component.form.controls['username'].setValue('sample');
    const registerSpy = spyOn(component, 'register');
    fixture.detectChanges();
    const button = el.query(By.css('.button'));
    button.nativeElement.click();
    fixture.detectChanges();
    expect(registerSpy).toHaveBeenCalled();
  });

  it('should register client', (done: any) => {
    component.form.controls['email'].setValue('me@mail.com');
    component.form.controls['phone'].setValue('1234567890');
    component.form.controls['username'].setValue('sample');
    fixture.detectChanges();
    const button = el.query(By.css('.button'));
    button.nativeElement.click();
    fixture.detectChanges();
    component.newSubscription = component.store.select(selectAllClients).subscribe(clients => {
      expect(clients).toContain(jasmine.objectContaining({ email: 'me@mail.com'}));
      done();
    });
  });
});
