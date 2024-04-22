import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectDeliverableViewComponent } from './project-deliverable-view.component';
import { ProjectDeliverableViewRoutingModule } from './project-deliverable-view-routing.module';
import { KeyvalueModule } from 'src/app/shared/ui/keyvalue/keyvalue.module';
import { IconCounterModule } from 'src/app/shared/ui/icon-counter/icon-counter.module';
import { MoreModule } from 'src/app/shared/ui/more/more.module';
import { PopupModule } from 'src/app/shared/features/popup/features/popup.module';
import { ProjectDeliverableUpdateModule } from '../project-deliverable-update/project-deliverable-update.module';
import { EmptyModule } from 'src/app/shared/ui/empty/empty.module';
import { DirectivesModule } from 'src/app/shared/utils/directives/directives.module';
import { WarnModule } from 'src/app/shared/ui/warn/warn.module';
import { AttatchmentListModule } from 'src/app/shared/features/attatchment/features/attatchment-list/attatchment-list.module';
import { AttatchmentUploadModule } from 'src/app/shared/features/attatchment/features/attatchment-upload/attatchment-upload.module';


@NgModule({
  declarations: [
    ProjectDeliverableViewComponent
  ],
  imports: [
    CommonModule,
    ProjectDeliverableViewRoutingModule,
    ProjectDeliverableUpdateModule,
    KeyvalueModule,
    IconCounterModule,
    MoreModule,
    PopupModule,
    EmptyModule,
    DirectivesModule,
    WarnModule,
    ProjectDeliverableUpdateModule,
    AttatchmentListModule,
    AttatchmentUploadModule
  ]
})
export class ProjectDeliverableViewModule { }
