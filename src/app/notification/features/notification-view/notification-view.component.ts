import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Notification } from '../../utils/models/notification.model';
import { UnSubscriber } from 'src/app/general/utils/services/unsubscriber.service';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.state';
import { selectNotificationById } from '../../utils/store/notification-store.selector';
import { More } from 'src/app/general/utils/models/more.model';
import { PopupService } from 'src/app/general/features/popup/features/popup.service';
import { NotificationLink } from '../../utils/models/notification-link.model';
import { Router } from '@angular/router';


@Component({
  selector: 'app-notification-view',
  templateUrl: './notification-view.component.html',
  styleUrls: ['./notification-view.component.scss']
})
export class NotificationViewComponent extends UnSubscriber implements OnChanges {
  @Input({ required: true }) id = '';
  @Input({ required: true }) userId = '';

  notification!: Notification;
  moreList: More[] = [];

  get status() {
    const status = this.notification.users.find(user => user.userId === this.userId)?.status;
    return status;
  }

  constructor(
    public store: Store<AppState>,
    public popupService: PopupService,
    public router: Router
  ){
    super();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.newSubscription = this.store.select(selectNotificationById(this.id)).subscribe(notification => {      
      this.notification = notification;
    });    
  }

  openLink(item: NotificationLink){
    const url = new URL(item.url);
    this.router.navigateByUrl(url.pathname);
  }
}
