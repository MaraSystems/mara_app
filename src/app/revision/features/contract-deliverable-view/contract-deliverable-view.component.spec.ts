import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractDeliverableViewComponent } from './contract-deliverable-view.component';

describe('ContractDeliverableViewComponent', () => {
  let component: ContractDeliverableViewComponent;
  let fixture: ComponentFixture<ContractDeliverableViewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ContractDeliverableViewComponent]
    });
    fixture = TestBed.createComponent(ContractDeliverableViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
