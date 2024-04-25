import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectViewComponent } from './project-view.component';
import { ProjectViewRoutingModule } from './project-view-routing.module';
import { KeyvalueModule } from 'src/app/general/ui/keyvalue/keyvalue.module';
import { IconCounterModule } from 'src/app/general/ui/icon-counter/icon-counter.module';
import { MoreModule } from 'src/app/general/ui/more/more.module';
import { PopupModule } from 'src/app/general/features/popup/features/popup.module';
import { ProjectDeliverableListModule } from '../../../project-deliverable/features/project-deliverable-list/project-deliverable-list.module';
import { ProjectUpdateModule } from '../project-update/project-update.module';
import { DirectivesModule } from 'src/app/general/utils/directives/directives.module';
import { EmptyModule } from 'src/app/general/ui/empty/empty.module';
import { ProjectDeliverableItemModule } from 'src/app/project-deliverable/ui/project-deliverable-item/project-deliverable-item.module';
import { CommentListModule } from 'src/app/general/features/comment/features/comment-list/comment-list.module';
import { ShareModule } from 'src/app/general/features/share/features/share.module';


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
    CommentListModule,
    ShareModule
  ]
})
export class ProjectViewModule { }
