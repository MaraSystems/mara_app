import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectDeliverableListComponent } from './project-deliverable-list.component';
import { TableHeaderModule } from 'src/app/shared/ui/table-header/table-header.module';
import { EmptyModule } from 'src/app/shared/ui/empty/empty.module';
import { ProjectDeliverableItemModule } from '../../ui/project-deliverable-item/project-deliverable-item.module';
import { RouterModule } from '@angular/router';
import { ProjectDeliverableListRoutingModule } from './project-deliverable-list-routing.module';



@NgModule({
  declarations: [
    ProjectDeliverableListComponent
  ],
  imports: [
    CommonModule,
    TableHeaderModule,
    EmptyModule,
    ProjectDeliverableItemModule,
    ProjectDeliverableListRoutingModule
  ],
  exports: [
    ProjectDeliverableListComponent
  ]
})
export class ProjectDeliverableListModule { }
