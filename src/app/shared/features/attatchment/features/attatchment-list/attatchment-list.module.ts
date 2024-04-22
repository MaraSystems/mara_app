import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AttatchmentListComponent } from './attatchment-list.component';
import { EmptyModule } from 'src/app/shared/ui/empty/empty.module';
import { TableHeaderModule } from 'src/app/shared/ui/table-header/table-header.module';
import { AttatchmentItemModule } from '../../ui/attatchment-item/attatchment-item.module';
import { PopupModule } from '../../../popup/features/popup.module';
import { AttatchmentUploadModule } from '../attatchment-upload/attatchment-upload.module';



@NgModule({
  declarations: [
    AttatchmentListComponent
  ],
  imports: [
    CommonModule,
    EmptyModule,
    TableHeaderModule,
    AttatchmentItemModule,
    PopupModule,
    AttatchmentUploadModule
  ],
  exports: [
    AttatchmentListComponent
  ]
})
export class AttatchmentListModule { }
