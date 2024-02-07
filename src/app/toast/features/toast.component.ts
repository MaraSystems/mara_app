import { Component, ElementRef, OnInit } from '@angular/core';
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
  element!: Element;

  constructor(
    private store: Store<AppState>,
    el: ElementRef
  ) { 
    super();
    this.element = el.nativeElement;
  }

  ngOnInit(): void {
    this.toasts = this.store.select(selectToasts);
    this.newSubscription = this.toasts.subscribe(toasts => {         
      for (const toast of toasts) {
        if (toast.duration) {
          setTimeout(() => {
            this.closeToast(toast.id);
          }, toast.duration * 1000);
        }
      }   
    });
  }

  closeToast(id: string) {   
    const list = this.element.getElementsByClassName('toast-item');
    const item = Array.from(list).find(listItem => listItem.id === id);

    if (item) {
      item.classList.remove('active-toast');
      item.classList.add('inactive-toast');
      setTimeout(() => {
        this.store.dispatch(new RemoveToast(id));
      }, 1000);
    }
  }
}
