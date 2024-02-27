import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FootbarComponent } from './footbar.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('FootbarComponent', () => {
  let component: FootbarComponent;
  let fixture: ComponentFixture<FootbarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FootbarComponent],
      imports: [
        RouterTestingModule
      ]
    });
    fixture = TestBed.createComponent(FootbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
