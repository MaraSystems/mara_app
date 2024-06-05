import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationItemComponent } from './notification-item.component';
import { DirectivesModule } from 'src/app/general/utils/directives/directives.module';
import { PopupModule } from 'src/app/general/features/popup/features/popup.module';
// import { NotificationViewModule } from '../../features/notification-view/notification-view.module';
import { MoreModule } from 'src/app/general/ui/more/more.module';


@NgModule({
  declarations: [
    NotificationItemComponent
  ],
  imports: [
    CommonModule,
    DirectivesModule,
    PopupModule,
    // NotificationViewModule,
    MoreModule
  ],
  exports: [
    NotificationItemComponent
  ]
})
export class NotificationItemModule { }
