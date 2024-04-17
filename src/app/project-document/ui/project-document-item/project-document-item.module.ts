import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectDocumentItemComponent } from './project-document-item.component';
import { DirectivesModule } from 'src/app/shared/utils/directives/directives.module';



@NgModule({
  declarations: [
    ProjectDocumentItemComponent,
  ],
  imports: [
    CommonModule,
    DirectivesModule
  ],
  exports: [
    ProjectDocumentItemComponent
  ]
})
export class ProjectDocumentItemModule { }
