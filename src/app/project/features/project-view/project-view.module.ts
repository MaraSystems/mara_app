import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectViewComponent } from './project-view.component';
import { ProjectViewRoutingModule } from './project-view-routing.module';
import { KeyvalueModule } from 'src/app/shared/ui/keyvalue/keyvalue.module';
import { IconCounterModule } from 'src/app/shared/ui/icon-counter/icon-counter.module';
import { MoreModule } from 'src/app/shared/ui/more/more.module';
import { PopupModule } from 'src/app/shared/features/popup/features/popup.module';
import { ProjectDeliverableListModule } from '../../../project-deliverable/features/project-deliverable-list/project-deliverable-list.module';
import { ProjectUpdateModule } from '../project-update/project-update.module';
import { DirectivesModule } from 'src/app/shared/utils/directives/directives.module';
import { EmptyModule } from 'src/app/shared/ui/empty/empty.module';
import { ProjectDeliverableItemModule } from 'src/app/project-deliverable/ui/project-deliverable-item/project-deliverable-item.module';
import { WarnModule } from 'src/app/shared/ui/warn/warn.module';


@NgModule({
  declarations: [
    ProjectViewComponent
  ],
  imports: [
    CommonModule,
    ProjectViewRoutingModule,
    KeyvalueModule,
    IconCounterModule,
    MoreModule,
    PopupModule,
    ProjectDeliverableListModule,
    ProjectUpdateModule,
    ProjectDeliverableItemModule,
    DirectivesModule,
    EmptyModule,
    WarnModule
  ]
})
export class ProjectViewModule { }
