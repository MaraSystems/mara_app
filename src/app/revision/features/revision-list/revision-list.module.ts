import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RevisionListComponent } from './revision-list.component';
import { TableHeaderModule } from 'src/app/general/ui/table-header/table-header.module';
import { EmptyModule } from 'src/app/general/ui/empty/empty.module';
import { RevisionItemModule } from '../../ui/revision-item/revision-item.module';
import { RevisionListRoutingModule } from './revision-list-routing.module';



@NgModule({
  declarations: [
    RevisionListComponent
  ],
  imports: [
    CommonModule,
    TableHeaderModule,
    EmptyModule,
    RevisionItemModule,
    RevisionListRoutingModule
  ],
  exports: [
    RevisionListComponent
  ]
})
export class RevisionListModule { }
