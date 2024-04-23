import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommentItemComponent } from './comment-item.component';
import { IconCounterModule } from 'src/app/general/ui/icon-counter/icon-counter.module';



@NgModule({
  declarations: [
    CommentItemComponent
  ],
  imports: [
    CommonModule,
    IconCounterModule
  ],
  exports: [
    CommentItemComponent
  ]
})
export class CommentItemModule { }
