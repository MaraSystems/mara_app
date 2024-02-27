import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectListComponent } from './project-list.component';
import { ProjectListRoutingModule } from './project-list-routing.module';
import { ProjectItemModule } from '../../ui/project-item/project-item.module';



@NgModule({
  declarations: [
    ProjectListComponent
  ],
  imports: [
    CommonModule,
    ProjectListRoutingModule,
    ProjectItemModule
  ]
})
export class ProjectListModule { }
