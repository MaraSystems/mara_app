import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AttachmentItemComponent } from './attachment-item.component';
import { DirectivesModule } from 'src/app/general/utils/directives/directives.module';
import { MoreModule } from 'src/app/general/ui/more/more.module';
import { PopupModule } from 'src/app/general/features/popup/popup.module';
import { AttachmentUploadModule } from '../../features/attachment-upload/attachment-upload.module';
import { AttachmentViewModule } from '../attachment-view/attachment-view.module';



@NgModule({
  declarations: [
    AttachmentItemComponent,
  ],
  imports: [
    CommonModule,
    DirectivesModule,
    MoreModule,
    PopupModule,
    AttachmentUploadModule,
    AttachmentViewModule
  ],
  exports: [
    AttachmentItemComponent
  ]
})
export class AttachmentItemModule { }
