import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommentItemComponent } from './comment-item.component';
import { IconCounterModule } from 'src/app/general/ui/icon-counter/icon-counter.module';
import { MoreModule } from 'src/app/general/ui/more/more.module';
import { PopupModule } from '../../../popup/popup.module';
import { ShareModule } from '../../../share/features/share.module';



@NgModule({
  declarations: [
    CommentItemComponent
  ],
  imports: [
    CommonModule,
    IconCounterModule,
    MoreModule,
    PopupModule,
    ShareModule
  ],
  exports: [
    CommentItemComponent
  ]
})
export class CommentItemModule { }
