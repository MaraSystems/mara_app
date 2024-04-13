import { Injectable } from '@angular/core';
import { PopupComponent } from './popup.component';
import { Store } from '@ngrx/store';
import { selectPopupAction } from '../utils/store/popup.selector';

@Injectable({
  providedIn: 'root'
})
export class PopupService {
  private popups: PopupComponent[] = [];

  constructor(
    private store: Store
  ) { 
    this.store.select(selectPopupAction).subscribe(popup => {
      if (popup) {
        const { id, action, data } = popup;
        if (action === 'close') {
          this.close(id);
        }
        else if (action == 'open') {
          this.open(id, data);
        }
        else if (action == 'remove'){
          this.remove(id);
        }
      }
    });
  }

  add(popup: PopupComponent) {  
    if (this.popups.find(m => m.name == popup.name)) {
      console.error(`${popup.name} is already taken by another pop-up`);
      return;
    }

    this.popups.push(popup);
  }

  remove(name: string) {
    this.popups = this.popups.filter(x => x.name !== name);
  }

  open(name: string, data?: any) {    
    const popup = this.popups.find(x => x.name === name) as PopupComponent;
    if (popup) {
      popup.open(data); 
    }   
  }

  close(name: string) {
    const popup = this.popups.find(x => x.name === name) as PopupComponent;    
    if (popup) {
      popup.close();
    }
  }

  delete(name: string) {
    this.close(name);
    this.remove(name);
  }
}
