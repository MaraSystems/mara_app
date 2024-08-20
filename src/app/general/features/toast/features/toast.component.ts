import { Component, ElementRef, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.state';
import { selectToasts } from '../utils/store/toast.selector';
import { UnSubscriber } from 'src/app/general/utils/services/unsubscriber.service';
import { RemoveToast, UpdateToast } from '../utils/store/toast.action';
import { Toast } from '../utils/models/toast';
import { ToastType } from '../utils/models/toast-type';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss']
})
export class ToastComponent extends UnSubscriber implements OnInit {
  toasts!: Observable<Toast[]>
  element!: Element;
  timeout = 1000;
  enum = ToastType;

  constructor(
    public store: Store<AppState>,
    el: ElementRef
  ) { 
    super();
    this.element = el.nativeElement;
  }

  ngOnInit(): void {
    this.toasts = this.store.select(selectToasts);
    this.newSubscription = this.toasts.subscribe(toasts => {               
      for (const { id, duration } of toasts) {        
        if (duration) {          
          setTimeout(() => {
            this.closeToast(id);
          }, duration * this.timeout);
        }
      }   
    });
  }

  closeToast(id: string) {   
    const list = this.element.getElementsByClassName('toast');
    const item = Array.from(list).find(listItem => listItem.id === id);
    
    if (item) {
      item.classList.remove('active-toast');
      item.classList.add('inactive-toast');
      setTimeout(() => {
        this.store.dispatch(new RemoveToast(id));
      }, this.timeout);
    }
  }

  select(id: string, selected: string) {    
    this.store.dispatch(new UpdateToast({ id, changes: { selected }}));
  }
}
