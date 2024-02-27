import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectItemComponent } from './project-item.component';
import { UnitDirective } from 'src/app/shared/utils/directives/unit.directive';



@NgModule({
  declarations: [
    ProjectItemComponent,
    UnitDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ProjectItemComponent
  ]
})
export class ProjectItemModule { }
