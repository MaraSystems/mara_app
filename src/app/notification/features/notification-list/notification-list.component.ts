import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { UnSubscriber } from 'src/app/general/utils/services/unsubscriber.service';
import { Notification } from '../../utils/models/notification.model';
import { ListNotificationsAction } from '../../utils/store/notification-store.action';
import { PopupService } from 'src/app/general/features/popup/features/popup.service';
import { selectAllClientNotifications } from '../../utils/store/notification-store.selector';
import { selectActiveAuth } from 'src/app/auth/utils/store/auth-store.selector';
import { Auth } from 'src/app/auth/utils/models/auth.model';

@Component({
  selector: 'app-notification-list',
  templateUrl: './notification-list.component.html',
  styleUrls: ['./notification-list.component.scss']
})
export class NotificationListComponent extends UnSubscriber implements OnInit {
  notifications: Notification[] = [];
  selectedNotificationId = '';
  auth!: Auth;

  constructor(
    public store: Store,
    public popupService: PopupService
  ){
    super();
  }

  ngOnInit(): void {
    this.store.dispatch(new ListNotificationsAction({ limit: 10, skip: 0 }));

    this.newSubscription = this.store.select(selectActiveAuth).subscribe(auth => {
      this.auth = auth;

      if (this.auth) {
        this.newSubscription = this.store.select(selectAllClientNotifications(this.auth.id)).subscribe(notifications => {            
          this.notifications = notifications;
        });
      }
    });
  }

  openNotification(id: string) {    
    this.selectedNotificationId = id; 
    this.popupService.open('notification-view');
  }
}
