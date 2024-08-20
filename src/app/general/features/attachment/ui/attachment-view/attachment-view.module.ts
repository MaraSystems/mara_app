import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AttachmentViewComponent } from './attachment-view.component';
import { DirectivesModule } from 'src/app/general/utils/directives/directives.module';
import { MoreModule } from 'src/app/general/ui/more/more.module';
import { PopupModule } from 'src/app/general/features/popup/popup.module';
import { AttachmentUploadModule } from '../../features/attachment-upload/attachment-upload.module';



@NgModule({
  declarations: [
    AttachmentViewComponent,
  ],
  imports: [
    CommonModule,
    DirectivesModule,
    MoreModule,
    PopupModule,
    AttachmentUploadModule
  ],
  exports: [
    AttachmentViewComponent
  ]
})
export class AttachmentViewModule { }
