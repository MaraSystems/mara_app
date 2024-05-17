import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractShellComponent } from './contract-shell.component';
import { appEffects, appReducers } from 'src/app/app.state';
import { Store, StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { TestsService } from 'src/tests/tests.service';
import { DebugElement, inject } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';

describe('ContractShellComponent', () => {
  let component: ContractShellComponent;
  let fixture: ComponentFixture<ContractShellComponent>;
  let testsService: TestsService;
  let el: DebugElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        ContractShellComponent,
      ],
      providers: [
        Store
      ],
      imports: [
        StoreModule.forRoot(appReducers),
        EffectsModule.forRoot(appEffects),
        HttpClientModule,
        RouterTestingModule
      ]
    }).runInInjectionContext(() => {
      testsService = inject(TestsService);
      testsService.registerClient();
      testsService.login();
    });

    fixture = TestBed.createComponent(ContractShellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    el = fixture.debugElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
