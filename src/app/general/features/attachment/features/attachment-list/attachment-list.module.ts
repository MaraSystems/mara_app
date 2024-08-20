import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AttachmentListComponent } from './attachment-list.component';
import { EmptyModule } from 'src/app/general/ui/empty/empty.module';
import { TableHeaderModule } from 'src/app/general/ui/table-header/table-header.module';
import { AttachmentItemModule } from '../../ui/attachment-item/attachment-item.module';
import { PopupModule } from '../../../popup/popup.module';
import { AttachmentUploadModule } from '../attachment-upload/attachment-upload.module';



@NgModule({
  declarations: [
    AttachmentListComponent
  ],
  imports: [
    CommonModule,
    EmptyModule,
    TableHeaderModule,
    AttachmentItemModule,
    PopupModule,
    AttachmentUploadModule
  ],
  exports: [
    AttachmentListComponent
  ]
})
export class AttachmentListModule { }
