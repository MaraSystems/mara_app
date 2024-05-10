import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShareAddComponent } from './share-add.component';
import { SelectModule } from 'src/app/general/ui/select/select.module';
import { ListInputModule } from 'src/app/general/ui/list-input/list-input.module';
import { InputModule } from 'src/app/general/ui/input/input.module';


@NgModule({
  declarations: [
    ShareAddComponent
  ],
  imports: [
    CommonModule,
    ListInputModule,
    SelectModule,
    InputModule,
  ],
  exports: [
    ShareAddComponent
  ]
})
export class ShareAddModule { }
