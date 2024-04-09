import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectListComponent } from './project-list.component';
import { ProjectListRoutingModule } from './project-list-routing.module';
import { ProjectItemModule } from '../../ui/project-item/project-item.module';
import { TableHeaderModule } from 'src/app/shared/ui/table-header/table-header.module';
import { EmptyModule } from 'src/app/shared/ui/empty/empty.module';



@NgModule({
  declarations: [
    ProjectListComponent
  ],
  imports: [
    CommonModule,
    ProjectListRoutingModule,
    ProjectItemModule,
    TableHeaderModule,
    EmptyModule
  ]
})
export class ProjectListModule { }
