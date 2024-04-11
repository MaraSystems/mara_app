import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectDeliverableViewComponent } from './project-deliverable-view.component';
import { ProjectDeliverableViewRoutingModule } from './project-deliverable-view-routing.module';
import { KeyvalueModule } from 'src/app/shared/ui/keyvalue/keyvalue.module';
import { IconCounterModule } from 'src/app/shared/ui/icon-counter/icon-counter.module';
import { MoreModule } from 'src/app/shared/ui/more/more.module';
import { PopupModule } from 'src/app/shared/features/popup/features/popup.module';
import { ProjectDeliverableFilesModule } from '../project-deliverable-files/project-deliverable-files.module';
import { ProjectDeliverableUpdateModule } from '../project-deliverable-update/project-deliverable-update.module';


@NgModule({
  declarations: [
    ProjectDeliverableViewComponent
  ],
  imports: [
    CommonModule,
    ProjectDeliverableViewRoutingModule,
    ProjectDeliverableFilesModule,
    ProjectDeliverableUpdateModule,
    KeyvalueModule,
    IconCounterModule,
    MoreModule,
    PopupModule
  ]
})
export class ProjectDeliverableViewModule { }
