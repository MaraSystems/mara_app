import { ComponentFixture, TestBed, fakeAsync, flush, tick } from '@angular/core/testing';

import { ToastComponent } from './toast.component';
import { Store, StoreModule } from '@ngrx/store';
import { appReducers } from 'src/app/app.state';
import { AddToast } from '../utils/store/toast.action';
import { Toast } from './toast.model';
import { selectToasts } from '../utils/store/toast.selector';

describe('ToastComponent', () => {
  let component: ToastComponent;
  let fixture: ComponentFixture<ToastComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ToastComponent ],
      providers: [ Store ],
      imports: [ StoreModule.forRoot(appReducers) ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ToastComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have no toasts', (done: any) => {
    component.store.select(selectToasts).subscribe(toasts => {
      expect(toasts.length).toBe(0);
      done();
    });
  });

  it('should have 1 toasts', (done: any) => {
    component.store.dispatch(new AddToast(new Toast({ title: 'Sample toast' })));
    component.store.select(selectToasts).subscribe(toasts => {
      expect(toasts.length).toBe(1);
      done();
    });
  });

  it('should remove toast when closeToast is called', fakeAsync(() => {
    const toast = new Toast({ title: 'Sample toast' });
    component.store.dispatch(new AddToast(toast));
    fixture.detectChanges();
    component.closeToast(toast.id);
    tick(component.timeout);
    component.store.select(selectToasts).subscribe(toasts => {
      expect(toasts.length).toBe(0);
    });
    flush();
  }));

  it('should call closeToast automatically', fakeAsync(() => {
    const closeSpy = spyOn(component, 'closeToast');
    const toast = new Toast({ title: 'Sample toast' });
    component.store.dispatch(new AddToast(toast));
    fixture.detectChanges();    
    tick(component.timeout * (toast.data.duration as number));
    expect(closeSpy).toHaveBeenCalledWith(toast.id);
    flush();
  }));
});
