import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractDeliverableListComponent } from './contract-deliverable-list.component';

describe('ContractDeliverableListComponent', () => {
  let component: ContractDeliverableListComponent;
  let fixture: ComponentFixture<ContractDeliverableListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ContractDeliverableListComponent]
    });
    fixture = TestBed.createComponent(ContractDeliverableListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
