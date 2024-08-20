import { v4 as uuid } from 'uuid';
import { ToastType } from './toast-type';
import { inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { AddToastSuccess, RemoveToast } from '../store/toast.action';
import { selectToastById } from '../store/toast.selector';



export interface IToast {
    type?: ToastType;
    title?: string;
    description?: string;
    duration?: number;
    options?: string[]
}

export class Toast {
    id: string = '';
    duration = 5;
    title = '';
    description = '';
    type = ToastType.NOTE;
    options: string[] = [];
    selected = '';

    constructor(
        data: Partial<IToast>
    ){        
        const { duration, type, title, options, description } = data;        
        this.id = uuid();
        this.type = type ? type : this.type;
        this.title = title ? title : this.title;
        this.description = description ? description : this.description;

        this.duration = (typeof duration !== 'undefined') ? duration : this.duration;
        if (this.type === ToastType.WAIT) {
            this.duration = 0;
        }
        this.options = options ? options : this.options;
    }

    static warn (
        store: Store, 
        warning: string,
        options: string[] = [], 
        callback = (selected: string) => {}
    ) {
        const toast = new Toast({ title: warning, type: ToastType.WAIT, options });
        store.dispatch(new AddToastSuccess(toast));
    
        store.select(selectToastById(toast.id)).subscribe(t => {
          if (t?.selected) {        
            store.dispatch(new RemoveToast(t.id));
            callback(t.selected);
          }
        });
    }
}