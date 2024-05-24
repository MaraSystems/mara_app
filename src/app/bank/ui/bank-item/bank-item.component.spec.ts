import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BankItemComponent } from './bank-item.component';

describe('BankItemComponent', () => {
  let component: BankItemComponent;
  let fixture: ComponentFixture<BankItemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BankItemComponent],
      imports: [
        
      ]
    });
    fixture = TestBed.createComponent(BankItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
