import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectDeliverableItemComponent } from './project-deliverable-item.component';
import { DirectivesModule } from 'src/app/general/utils/directives/directives.module';



@NgModule({
  declarations: [
    ProjectDeliverableItemComponent,
  ],
  imports: [
    CommonModule,
    DirectivesModule
  ],
  exports: [
    ProjectDeliverableItemComponent
  ]
})
export class ProjectDeliverableItemModule { }
