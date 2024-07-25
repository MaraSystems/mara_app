import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationViewComponent } from './notification-view.component';
import { KeyvalueModule } from 'src/app/general/ui/keyvalue/keyvalue.module';
import { IconCounterModule } from 'src/app/general/ui/icon-counter/icon-counter.module';
import { MoreModule } from 'src/app/general/ui/more/more.module';
import { PopupModule } from 'src/app/general/features/popup/features/popup.module';
import { DirectivesModule } from 'src/app/general/utils/directives/directives.module';
import { EmptyModule } from 'src/app/general/ui/empty/empty.module';
import { CommentListModule } from 'src/app/general/features/comment/features/comment-list/comment-list.module';
import { ShareModule } from 'src/app/general/features/share/features/share.module';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    NotificationViewComponent
  ],
  imports: [
    CommonModule,
    KeyvalueModule,
    IconCounterModule,
    MoreModule,
    PopupModule,
    DirectivesModule,
    EmptyModule,
    CommentListModule,
    ShareModule,
    RouterModule
  ],
  exports: [
    NotificationViewComponent
  ]
})
export class NotificationViewModule { }
