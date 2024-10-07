import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RevisionCommentComponent } from './revision-comment.component';
import { DirectivesModule } from 'src/app/general/utils/directives/directives.module';
import { CommentItemModule } from "../../../comment/ui/comment-item/comment-item.module";
import { PopupModule } from "../../../general/features/popup/popup.module";
import { CommentListModule } from "../../../comment/features/comment-list/comment-list.module";
import { MoreModule } from "../../../general/ui/more/more.module";



@NgModule({
  declarations: [
    RevisionCommentComponent,
  ],
  imports: [
    CommonModule,
    DirectivesModule,
    CommentItemModule,
    PopupModule,
    CommentListModule,
    MoreModule
],
  exports: [
    RevisionCommentComponent
  ]
})
export class RevisionCommentModule { }
