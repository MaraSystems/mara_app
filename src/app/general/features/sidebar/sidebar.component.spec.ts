import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarComponent } from './sidebar.component';
import { Store, StoreModule } from '@ngrx/store';
import { RouterTestingModule } from '@angular/router/testing';
import { appReducers } from 'src/app/app.state';

describe('SidebarComponent', () => {
  let component: SidebarComponent;
  let fixture: ComponentFixture<SidebarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SidebarComponent],
      providers: [Store],
      imports: [
        StoreModule.forRoot(appReducers),
        RouterTestingModule
      ]
    });
    fixture = TestBed.createComponent(SidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
