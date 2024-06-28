import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractCreateComponent } from './contract-create.component';
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
import { selectAllContracts } from '../../utils/store/contract-store.selector';

describe('ContractCreateComponent', () => {
  let component: ContractCreateComponent;
  let fixture: ComponentFixture<ContractCreateComponent>;
  let testsService: TestsService;
  let el: DebugElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        ContractCreateComponent,
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
        ])
      ]
    }).runInInjectionContext(() => {
      testsService = inject(TestsService);
      testsService.registerClient();
      testsService.login();
    });

    fixture = TestBed.createComponent(ContractCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    el = fixture.debugElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update contract data on form update', () => {
    component.form.controls['title'].setValue('sample');
    fixture.detectChanges();
    expect(component.contract).toEqual(jasmine.objectContaining({ title: 'sample' }));
  });

  it('should disable contract button when form is invalid', () => {
    component.form.controls['title'].setValue('sample');
    fixture.detectChanges();
    const button = el.query(By.css('.button'));
    expect(button.nativeElement.disabled).toEqual(true);
  });

  it('should call create contract', () => {
    component.form.controls['title'].setValue('Sample');
    component.form.controls['category'].setValue('Sample Category');
    component.form.controls['tags'].setValue('Sample');
    const createSpy = spyOn(component, 'createContract');
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
    component.newSubscription = component.store.select(selectAllContracts).subscribe(contracts => {
      expect(contracts).toContain(jasmine.objectContaining({ title: 'Sample'}));
      done();
    });
  });
});
