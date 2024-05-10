import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShareAccessComponent } from './share-access.component';
import { SelectModule } from 'src/app/general/ui/select/select.module';
import { InputModule } from 'src/app/general/ui/input/input.module';
import { ListInputModule } from 'src/app/general/ui/list-input/list-input.module';
import { ShareItemModule } from '../share-item/share-item.module';
import { ShareAddModule } from '../share-add/share-add.module';



@NgModule({
  declarations: [
    ShareAccessComponent
  ],
  imports: [
    CommonModule,
    SelectModule,
    InputModule,
    ListInputModule,
    ShareItemModule,
    ShareAddModule
  ],
  exports: [
    ShareAccessComponent
  ]
})
export class ShareAccessModule { }
