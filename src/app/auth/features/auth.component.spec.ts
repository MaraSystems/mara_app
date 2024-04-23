import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthComponent } from './auth.component';
import { Store, StoreModule } from '@ngrx/store';
import { InputModule } from 'src/app/general/ui/input/input.module';
import { PasswordModule } from '../ui/password/password.module';
import { AltAuthModule } from '../ui/alt-auth/alt-auth.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { appEffects, appReducers } from 'src/app/app.state';
import { DebugElement, inject } from '@angular/core';
import { By } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';
import { EffectsModule } from '@ngrx/effects';
import { HttpClientModule } from '@angular/common/http';
import { ProfileShellComponent } from 'src/app/profile/features/profile-shell/profile-shell.component';
import { selectAuthClient } from 'src/app/client/utils/store/client-store.selector';
import { RegisterClientAction } from 'src/app/client/utils/store/client-store.action';
import { Database } from '@black-ink/lonedb';
import { TestsService } from 'src/tests/tests.service';

describe('AuthComponent', () => {
  let component: AuthComponent;
  let fixture: ComponentFixture<AuthComponent>;
  let el: DebugElement;
  let testsService: TestsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AuthComponent],
      providers: [Store],
      imports: [
        StoreModule.forRoot(appReducers),
        EffectsModule.forRoot(appEffects),
        HttpClientModule,
        InputModule,
        PasswordModule,
        AltAuthModule,
        ReactiveFormsModule,
        FormsModule,
        RouterTestingModule.withRoutes([
          { path: 'profile', component: ProfileShellComponent }
        ])
      ]
    }).runInInjectionContext(() => {
      testsService = inject(TestsService);
    });

    fixture = TestBed.createComponent(AuthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    el = fixture.debugElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update login data on form update', () => {
    component.form.controls['email'].setValue('me@mail.com');
    fixture.detectChanges();
    expect(component.loginData).toEqual(jasmine.objectContaining({ email: 'me@mail.com' }));
  });

  it('should disable login button when form is invalid', () => {
    component.form.controls['email'].setValue('sample');
    fixture.detectChanges();
    const button = el.query(By.css('.button'));
    expect(button.nativeElement.disabled).toEqual(true);
  });

  it('should call login when form is valid', () => {
    component.form.controls['email'].setValue('me@mail.com');
    component.form.controls['password'].setValue('12345');
    const loginSpy = spyOn(component, 'login');
    fixture.detectChanges();
    const button = el.query(By.css('.button'));
    button.nativeElement.click();
    fixture.detectChanges();
    expect(loginSpy).toHaveBeenCalled();
  });

  it('should fail when client is not found', (done: any) => {
    component.form.controls['email'].setValue('me@mail.com');
    component.form.controls['password'].setValue('12345');
    fixture.detectChanges();
    const button = el.query(By.css('.button'));
    button.nativeElement.click();
    fixture.detectChanges();
    component.newSubscription = component.store.select(state => state.auth.error).subscribe(error => {
      expect(error).toBe('Not found');
      done();
    })
  });

  it('should login when client is found', (done: any) => {
    component.store.dispatch(new RegisterClientAction({ email: 'me@mail.com', username: 'me', phone: '1234567890' }));
    component.form.controls['email'].setValue('me@mail.com');
    component.form.controls['password'].setValue('12345');
    fixture.detectChanges();
    const button = el.query(By.css('.button'));
    button.nativeElement.click();
    fixture.detectChanges();
    component.newSubscription = component.store.select(selectAuthClient).subscribe(client => {
      expect(client).toEqual(jasmine.objectContaining({ email: 'me@mail.com' }));
      done();
    })
  });
});
