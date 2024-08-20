import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContractDeliverableViewComponent } from './contract-deliverable-view.component';
import { ContractDeliverableViewRoutingModule } from './contract-deliverable-view-routing.module';
import { KeyvalueModule } from 'src/app/general/ui/keyvalue/keyvalue.module';
import { IconCounterModule } from 'src/app/general/ui/icon-counter/icon-counter.module';
import { MoreModule } from 'src/app/general/ui/more/more.module';
import { PopupModule } from 'src/app/general/features/popup/popup.module';
import { EmptyModule } from 'src/app/general/ui/empty/empty.module';
import { DirectivesModule } from 'src/app/general/utils/directives/directives.module';
import { AttachmentListModule } from 'src/app/general/features/attachment/features/attachment-list/attachment-list.module';
import { AttachmentUploadModule } from 'src/app/general/features/attachment/features/attachment-upload/attachment-upload.module';
import { CommentListModule } from 'src/app/general/features/comment/features/comment-list/comment-list.module';
import { ShareModule } from 'src/app/general/features/share/features/share.module';


@NgModule({
  declarations: [
    ContractDeliverableViewComponent
  ],
  imports: [
    CommonModule,
    ContractDeliverableViewRoutingModule,
    KeyvalueModule,
    IconCounterModule,
    MoreModule,
    PopupModule,
    EmptyModule,
    DirectivesModule,
    AttachmentListModule,
    AttachmentUploadModule,
    CommentListModule,
    ShareModule
  ]
})
export class ContractDeliverableViewModule { }
