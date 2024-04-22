import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AttachmentItemComponent } from './attachment-item.component';
import { DirectivesModule } from 'src/app/shared/utils/directives/directives.module';
import { MoreModule } from 'src/app/shared/ui/more/more.module';
import { PopupModule } from 'src/app/shared/features/popup/features/popup.module';
import { WarnModule } from 'src/app/shared/ui/warn/warn.module';
import { AttachmentUploadModule } from '../../features/attachment-upload/attachment-upload.module';



@NgModule({
  declarations: [
    AttachmentItemComponent,
  ],
  imports: [
    CommonModule,
    DirectivesModule,
    MoreModule,
    PopupModule,
    WarnModule,
    AttachmentUploadModule
  ],
  exports: [
    AttachmentItemComponent
  ]
})
export class AttachmentItemModule { }
