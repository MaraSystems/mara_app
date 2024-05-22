import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WalletDebitComponent } from './wallet-debit.component';

describe('WalletDebitComponent', () => {
  let component: WalletDebitComponent;
  let fixture: ComponentFixture<WalletDebitComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WalletDebitComponent]
    });
    fixture = TestBed.createComponent(WalletDebitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
