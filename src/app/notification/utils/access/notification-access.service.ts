import { Injectable } from '@angular/core';
import { AccessService } from 'src/app/general/utils/services/access.service';
import { Notification } from '../models/notification.model';
import { ListOptions } from 'src/app/general/utils/models/list-options';
import { APIService } from 'src/app/general/utils/services/api.service';


@Injectable({
  providedIn: 'root'
})
export class NotificationAccessService {
  domain = 'notifications';

  constructor(
    private accessService: AccessService,
    private apiService: APIService
  ) {}

  getNotification(id: string) {    
    const response = this.accessService.findOne<Notification>(this.domain, { _id: id });
    return response;
  }

  listNotifications(userId: string, data: ListOptions) {        
    const response = this.accessService.find<[Notification]>(this.domain, { hidden: false });
    return response;
  }

  readNotification(id: string, userId: string) {    
    const response = this.apiService.readNotification(id, userId);
    return response;
  }
}
