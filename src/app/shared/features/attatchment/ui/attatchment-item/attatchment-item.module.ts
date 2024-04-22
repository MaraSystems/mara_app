import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AttatchmentItemComponent } from './attatchment-item.component';
import { DirectivesModule } from 'src/app/shared/utils/directives/directives.module';
import { MoreModule } from 'src/app/shared/ui/more/more.module';
import { PopupModule } from 'src/app/shared/features/popup/features/popup.module';
import { WarnModule } from 'src/app/shared/ui/warn/warn.module';
import { AttatchmentUploadModule } from '../../features/attatchment-upload/attatchment-upload.module';



@NgModule({
  declarations: [
    AttatchmentItemComponent,
  ],
  imports: [
    CommonModule,
    DirectivesModule,
    MoreModule,
    PopupModule,
    WarnModule,
    AttatchmentUploadModule
  ],
  exports: [
    AttatchmentItemComponent
  ]
})
export class AttatchmentItemModule { }
