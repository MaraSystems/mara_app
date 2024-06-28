import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ContractItemComponent } from './contract-item.component';


describe('ContractItemComponent', () => {
  let component: ContractItemComponent;
  let fixture: ComponentFixture<ContractItemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ContractItemComponent],
      imports: [
        
      ]
    });
    fixture = TestBed.createComponent(ContractItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
