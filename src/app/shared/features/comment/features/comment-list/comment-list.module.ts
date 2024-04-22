import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommentListComponent } from './comment-list.component';
import { CommentAddModule } from '../../ui/comment-add/comment-add.module';
import { CommentItemModule } from '../../ui/comment-item/comment-item.module';



@NgModule({
  declarations: [
    CommentListComponent
  ],
  imports: [
    CommonModule,
    CommentAddModule,
    CommentItemModule
  ],
  exports: [
    CommentListComponent
  ]
})
export class CommentListModule { }
