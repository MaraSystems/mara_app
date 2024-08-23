import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RevisionCreateComponent } from './revision-create.component';
import { TableHeaderModule } from 'src/app/general/ui/table-header/table-header.module';
import { EmptyModule } from 'src/app/general/ui/empty/empty.module';
import { RevisionItemModule } from '../../ui/revision-item/revision-item.module';
import { RevisionCreateRoutingModule } from './revision-create-routing.module';



@NgModule({
  declarations: [
    RevisionCreateComponent
  ],
  imports: [
    CommonModule,
    TableHeaderModule,
    EmptyModule,
    RevisionItemModule,
    RevisionCreateRoutingModule
  ],
  exports: [
    RevisionCreateComponent
  ]
})
export class RevisionCreateModule { }
