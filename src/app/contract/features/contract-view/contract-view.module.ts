import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContractViewComponent } from './contract-view.component';
import { ContractViewRoutingModule } from './contract-view-routing.module';
import { KeyvalueModule } from 'src/app/general/ui/keyvalue/keyvalue.module';
import { IconCounterModule } from 'src/app/general/ui/icon-counter/icon-counter.module';
import { MoreModule } from 'src/app/general/ui/more/more.module';
import { PopupModule } from 'src/app/general/features/popup/popup.module';
// import { ContractDeliverableListModule } from '../../../contract-deliverable/features/contract-deliverable-list/contract-deliverable-list.module';
// import { ContractUpdateModule } from '../contract-update/contract-update.module';
import { DirectivesModule } from 'src/app/general/utils/directives/directives.module';
import { EmptyModule } from 'src/app/general/ui/empty/empty.module';
import { ContractDeliverableItemModule } from 'src/app/contract-deliverable/ui/contract-deliverable-item/contract-deliverable-item.module';
import { CommentListModule } from 'src/app/general/features/comment/features/comment-list/comment-list.module';
import { ShareModule } from 'src/app/general/features/share/features/share.module';


@NgModule({
  declarations: [
    ContractViewComponent
  ],
  imports: [
    CommonModule,
    ContractViewRoutingModule,
    KeyvalueModule,
    IconCounterModule,
    MoreModule,
    PopupModule,
    // ContractDeliverableListModule,
    // ContractUpdateModule,
    ContractDeliverableItemModule,
    DirectivesModule,
    EmptyModule,
    CommentListModule,
    ShareModule
  ]
})
export class ContractViewModule { }
