import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractDeliverableItemComponent } from './contract-deliverable-item.component';

describe('ContractDeliverableItemComponent', () => {
  let component: ContractDeliverableItemComponent;
  let fixture: ComponentFixture<ContractDeliverableItemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ContractDeliverableItemComponent]
    });
    fixture = TestBed.createComponent(ContractDeliverableItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
