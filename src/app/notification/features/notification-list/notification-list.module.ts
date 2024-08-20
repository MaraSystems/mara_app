import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationListComponent } from './notification-list.component';
import { NotificationListRoutingModule } from './notification-list-routing.module';
import { TableHeaderModule } from 'src/app/general/ui/table-header/table-header.module';
import { EmptyModule } from 'src/app/general/ui/empty/empty.module';
import { NotificationItemModule } from '../../ui/notification-item/notification-item.module';
import { PopupModule } from 'src/app/general/features/popup/popup.module';
import { NotificationViewModule } from '../notification-view/notification-view.module';


@NgModule({
  declarations: [
    NotificationListComponent
  ],
  imports: [
    CommonModule,
    NotificationListRoutingModule,
    TableHeaderModule,
    EmptyModule,
    NotificationItemModule,
    PopupModule,
    NotificationViewModule
  ]
})
export class NotificationListModule { }
