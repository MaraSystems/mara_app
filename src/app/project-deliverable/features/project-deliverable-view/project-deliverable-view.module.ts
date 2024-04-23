import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectDeliverableViewComponent } from './project-deliverable-view.component';
import { ProjectDeliverableViewRoutingModule } from './project-deliverable-view-routing.module';
import { KeyvalueModule } from 'src/app/general/ui/keyvalue/keyvalue.module';
import { IconCounterModule } from 'src/app/general/ui/icon-counter/icon-counter.module';
import { MoreModule } from 'src/app/general/ui/more/more.module';
import { PopupModule } from 'src/app/general/features/popup/features/popup.module';
import { ProjectDeliverableUpdateModule } from '../project-deliverable-update/project-deliverable-update.module';
import { EmptyModule } from 'src/app/general/ui/empty/empty.module';
import { DirectivesModule } from 'src/app/general/utils/directives/directives.module';
import { WarnModule } from 'src/app/general/ui/warn/warn.module';
import { AttachmentListModule } from 'src/app/general/features/attachment/features/attachment-list/attachment-list.module';
import { AttachmentUploadModule } from 'src/app/general/features/attachment/features/attachment-upload/attachment-upload.module';
import { CommentListModule } from 'src/app/general/features/comment/features/comment-list/comment-list.module';


@NgModule({
  declarations: [
    ProjectDeliverableViewComponent
  ],
  imports: [
    CommonModule,
    ProjectDeliverableViewRoutingModule,
    ProjectDeliverableUpdateModule,
    KeyvalueModule,
    IconCounterModule,
    MoreModule,
    PopupModule,
    EmptyModule,
    DirectivesModule,
    WarnModule,
    ProjectDeliverableUpdateModule,
    AttachmentListModule,
    AttachmentUploadModule,
    CommentListModule
  ]
})
export class ProjectDeliverableViewModule { }
