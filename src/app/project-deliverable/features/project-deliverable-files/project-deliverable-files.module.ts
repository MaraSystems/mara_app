import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectDeliverableFilesComponent } from './project-deliverable-files.component';
import { ProjectDeliverableFilesRoutingModule } from './project-deliverable-files-routing.module';



@NgModule({
  declarations: [
    ProjectDeliverableFilesComponent
  ],
  imports: [
    CommonModule,
    ProjectDeliverableFilesRoutingModule
  ],
  exports: [
    ProjectDeliverableFilesComponent
  ]
})
export class ProjectDeliverableFilesModule { }
