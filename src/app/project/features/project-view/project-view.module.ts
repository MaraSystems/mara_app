import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectViewComponent } from './project-view.component';
import { ProjectViewRoutingModule } from './project-view-routing.module';



@NgModule({
  declarations: [
    ProjectViewComponent
  ],
  imports: [
    CommonModule,
    ProjectViewRoutingModule
  ]
})
export class ProjectViewModule { }
