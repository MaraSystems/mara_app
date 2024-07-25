import { Component, ElementRef, Input, OnInit } from '@angular/core';
import { Notification } from '../../utils/models/notification.model';

@Component({
  selector: 'app-notification-item',
  templateUrl: './notification-item.component.html',
  styleUrls: ['./notification-item.component.scss']
})
export class NotificationItemComponent {
  @Input() notification!: Notification;
  @Input() userId = '';

  get status() {
    const status = this.notification.users.find(user => user.userId === this.userId)?.status;    
    return status;
  }
}
