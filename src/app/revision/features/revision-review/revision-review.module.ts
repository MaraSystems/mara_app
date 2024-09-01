import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RevisionReviewComponent } from './revision-review.component';
import { TableHeaderModule } from 'src/app/general/ui/table-header/table-header.module';
import { EmptyModule } from 'src/app/general/ui/empty/empty.module';
import { RevisionItemModule } from '../../ui/revision-item/revision-item.module';
import { RevisionCreateRoutingModule } from './revision-review-routing.module';
import { AttachmentViewModule } from 'src/app/attachment/ui/attachment-view/attachment-view.module';
import { PopupModule } from "../../../general/features/popup/popup.module";
import { CommentAddModule } from "../../../comment/features/comment-add/comment-add.module";
import { RadioBottonsModule } from 'src/app/general/ui/radio-buttons/radio-buttons.module';
import { IconCounterModule } from 'src/app/general/ui/icon-counter/icon-counter.module';



@NgModule({
  declarations: [
    RevisionReviewComponent
  ],
  imports: [
    CommonModule,
    TableHeaderModule,
    EmptyModule,
    RevisionItemModule,
    RevisionCreateRoutingModule,
    AttachmentViewModule,
    PopupModule,
    CommentAddModule,
    RadioBottonsModule,
    IconCounterModule
],
  exports: [
    RevisionReviewComponent
  ]
})
export class RevisionReviewModule { }
