import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectDocumentListComponent } from './project-document-list.component';
import { ProjectDocumentListRoutingModule } from './project-document-list-routing.module';
import { EmptyModule } from 'src/app/shared/ui/empty/empty.module';
import { TableHeaderModule } from 'src/app/shared/ui/table-header/table-header.module';
import { ProjectDocumentItemModule } from '../../ui/project-document-item/project-document-item.module';



@NgModule({
  declarations: [
    ProjectDocumentListComponent
  ],
  imports: [
    CommonModule,
    ProjectDocumentListRoutingModule,
    EmptyModule,
    TableHeaderModule,
    ProjectDocumentItemModule,
  ],
  exports: [
    ProjectDocumentListComponent
  ]
})
export class ProjectDocumentListModule { }
