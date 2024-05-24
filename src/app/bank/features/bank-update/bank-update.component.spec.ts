import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BankUpdateComponent } from './bank-update.component';
import { Store, StoreModule } from '@ngrx/store';
import { InputComponent } from 'src/app/general/ui/input/input.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { appEffects, appReducers } from 'src/app/app.state';
import { EffectsModule } from '@ngrx/effects';
import { TestsService } from 'src/tests/tests.service';
import { DebugElement, inject } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';
import { selectAllBanks } from '../../utils/store/bank-store.selector';
import { BankListComponent } from '../bank-list/bank-list.component';

describe('BankUpdateComponent', () => {
  let component: BankUpdateComponent;
  let fixture: ComponentFixture<BankUpdateComponent>;
  let testsService: TestsService;
  let el: DebugElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        BankUpdateComponent,
        InputComponent,
      ],
      providers: [
        Store
      ],
      imports: [
        ReactiveFormsModule,
        FormsModule,
        StoreModule.forRoot(appReducers),
        EffectsModule.forRoot(appEffects),
        HttpClientModule,
        RouterTestingModule.withRoutes([
          { path: 'banks', component: BankListComponent }
        ])
      ]
    }).runInInjectionContext(() => {
      testsService = inject(TestsService);
      testsService.registerClient();
      testsService.login();
    });

    fixture = TestBed.createComponent(BankUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    el = fixture.debugElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update bank data on form update', () => {
    component.form.controls['title'].setValue('sample');
    fixture.detectChanges();
    expect(component.bank).toEqual(jasmine.objectContaining({ title: 'sample' }));
  });

  it('should disable bank button when form is invalid', () => {
    component.form.controls['title'].setValue('sample');
    fixture.detectChanges();
    const button = el.query(By.css('.button'));
    expect(button.nativeElement.disabled).toEqual(true);
  });

  it('should call create bank', () => {
    component.form.controls['title'].setValue('Sample');
    component.form.controls['category'].setValue('Sample Category');
    component.form.controls['tags'].setValue('Sample');
    const createSpy = spyOn(component, 'createBank');
    fixture.detectChanges();
    const button = el.query(By.css('.button'));
    button.nativeElement.click();
    fixture.detectChanges();
    expect(createSpy).toHaveBeenCalled();
  });

  it('should register client', (done: any) => {
    component.form.controls['title'].setValue('Sample');
    component.form.controls['category'].setValue('Sample Category');
    component.form.controls['tags'].setValue('Sample');
    fixture.detectChanges();
    const button = el.query(By.css('.button'));
    button.nativeElement.click();
    fixture.detectChanges();
    component.newSubscription = component.store.select(selectAllBanks).subscribe(banks => {
      expect(banks).toContain(jasmine.objectContaining({ title: 'Sample'}));
      done();
    });
  });
});
