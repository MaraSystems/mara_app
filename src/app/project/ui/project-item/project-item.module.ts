import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectItemComponent } from './project-item.component';
import { DirectivesModule } from 'src/app/shared/utils/directives/directives.module';


@NgModule({
  declarations: [
    ProjectItemComponent
  ],
  imports: [
    CommonModule,
    DirectivesModule
  ],
  exports: [
    ProjectItemComponent
  ]
})
export class ProjectItemModule { }
