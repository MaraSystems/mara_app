import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShareItemComponent } from './share-item.component';
import { SelectModule } from 'src/app/general/ui/select/select.module';



@NgModule({
  declarations: [
    ShareItemComponent
  ],
  imports: [
    CommonModule,
    SelectModule
  ],
  exports: [
    ShareItemComponent
  ]
})
export class ShareItemModule { }
