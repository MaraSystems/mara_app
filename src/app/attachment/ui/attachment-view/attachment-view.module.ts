import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AttachmentViewComponent } from './attachment-view.component';
import { DirectivesModule } from 'src/app/general/utils/directives/directives.module';
import { MoreModule } from 'src/app/general/ui/more/more.module';
import { PopupModule } from 'src/app/general/features/popup/popup.module';
import { AttachmentUploadModule } from '../../features/attachment-upload/attachment-upload.module';
import { CommentListModule } from '../../../comment/features/comment-list/comment-list.module';
import { SafePipe } from 'src/app/general/utils/pipes/safe.pipe';
import { FrameModule } from 'src/app/general/ui/frame/frame.module';
import { IconCounterModule } from 'src/app/general/ui/icon-counter/icon-counter.module';



@NgModule({
  declarations: [
    AttachmentViewComponent,
  ],
  imports: [
    CommonModule,
    DirectivesModule,
    MoreModule,
    PopupModule,
    AttachmentUploadModule,
    CommentListModule,
    FrameModule,
    IconCounterModule
  ],
  exports: [
    AttachmentViewComponent
  ]
})
export class AttachmentViewModule { }
