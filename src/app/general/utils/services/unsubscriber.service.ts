import { Injectable, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UnSubscriber implements OnDestroy {
  private _subscription: Subscription = new Subscription;

  ngOnDestroy(): void {
    if (this._subscription) {
      this._subscription.unsubscribe();
    }
  }

  addSubscription(subscription: Subscription) {
    this._subscription.add(subscription);
  }

  set newSubscription(subscription: Subscription) {
    this.addSubscription(subscription);
  }
}
