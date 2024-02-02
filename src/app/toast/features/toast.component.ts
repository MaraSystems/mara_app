import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Toast } from './toast.model';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.state';
import { selectToasts } from '../utils/store/toast.selector';
import { UnSubscriber } from 'src/app/shared/utils/services/unsubscriber.service';
import { RemoveToast } from '../utils/store/toast.action';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss']
})
export class ToastComponent extends UnSubscriber implements OnInit {
  toasts!: Observable<Toast[]>
  constructor(
    private store: Store<AppState>,
  ) { 
    super();
  }

  ngOnInit(): void {
    this.toasts = this.store.select(selectToasts);
    this.newSubscription = this.toasts.subscribe(toasts => {         
      for (const toast of toasts) {
        if (toast.duration) {
          setTimeout(() => {
            this.store.dispatch(new RemoveToast(toast.id));
          }, toast.duration);
        }
      }   
    });
  }

  closeToast(id: string) {    
    this.store.dispatch(new RemoveToast(id));
  }
}
