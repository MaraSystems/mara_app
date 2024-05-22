import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WalletCreditComponent } from './wallet-credit.component';

describe('WalletCreditComponent', () => {
  let component: WalletCreditComponent;
  let fixture: ComponentFixture<WalletCreditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WalletCreditComponent]
    });
    fixture = TestBed.createComponent(WalletCreditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
