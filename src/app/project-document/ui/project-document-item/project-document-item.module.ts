import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectDocumentItemComponent } from './project-document-item.component';
import { DirectivesModule } from 'src/app/shared/utils/directives/directives.module';
import { MoreModule } from 'src/app/shared/ui/more/more.module';
import { PopupModule } from 'src/app/shared/features/popup/features/popup.module';
import { WarnModule } from 'src/app/shared/ui/warn/warn.module';
import { ProjectDocumentUploadModule } from '../../features/project-document-upload/project-document-upload.module';



@NgModule({
  declarations: [
    ProjectDocumentItemComponent,
  ],
  imports: [
    CommonModule,
    DirectivesModule,
    MoreModule,
    PopupModule,
    WarnModule,
    ProjectDocumentUploadModule
  ],
  exports: [
    ProjectDocumentItemComponent
  ]
})
export class ProjectDocumentItemModule { }
