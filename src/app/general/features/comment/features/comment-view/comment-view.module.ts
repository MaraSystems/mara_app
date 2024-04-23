import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommentViewComponent } from './comment-view.component';
import { CommentAddModule } from '../../ui/comment-add/comment-add.module';
import { CommentItemModule } from '../../ui/comment-item/comment-item.module';



@NgModule({
  declarations: [
    CommentViewComponent
  ],
  imports: [
    CommonModule,
    CommentAddModule,
    CommentItemModule
  ],
  exports: [
    CommentViewComponent
  ]
})
export class CommentViewModule { }
