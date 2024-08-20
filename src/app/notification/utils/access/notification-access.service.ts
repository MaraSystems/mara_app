import { Injectable } from '@angular/core';
import { AccessService } from 'src/app/general/utils/services/access.service';
import { Notification } from '../models/notification';
import { ListOptions } from 'src/app/general/utils/models/list-options';
import { map, mergeMap } from 'rxjs';
import { NotificationStatusType } from '../models/notification-status-type';


@Injectable({
  providedIn: 'root'
})
export class NotificationAccessService {
  domain = 'notifications';

  constructor(
    private accessService: AccessService,
  ) {}

  createNotification(data: Notification) {    
    const response = this.accessService.insertOne<Notification>(this.domain, data);        
    return response;
  }

  getNotification(id: string) {    
    const response = this.accessService.findOne<Notification>(this.domain, { _id: id });
    return response;
  }

  listNotifications(userId: string, data: ListOptions) {        
    const response = this.accessService.find<[Notification]>(this.domain, { hidden: false });
    return response;
  }

  readNotification(id: string, userId: string) {
    return this.accessService.findOne<Notification>(this.domain, { _id: id })
      .pipe(
        map(({ data: notification }) => {
          if (!notification) {
            throw new Error('Notification not found');
          }
      
          const users = notification.users.map(user => {
            return user.userId === userId
              ? { ...user, status: NotificationStatusType.READ }
              : user
          });

          return users;
        })
      ).pipe(
        mergeMap((users) => this.accessService.updateOne<Notification>(this.domain, { _id: id }, { users }))
      )
  }
}
