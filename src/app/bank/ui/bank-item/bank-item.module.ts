import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BankItemComponent } from './bank-item.component';
import { DirectivesModule } from 'src/app/general/utils/directives/directives.module';
import { PopupModule } from 'src/app/general/features/popup/features/popup.module';
import { BankViewModule } from '../../features/bank-view/bank-view.module';
import { MoreModule } from 'src/app/general/ui/more/more.module';


@NgModule({
  declarations: [
    BankItemComponent
  ],
  imports: [
    CommonModule,
    DirectivesModule,
    PopupModule,
    BankViewModule,
    MoreModule
  ],
  exports: [
    BankItemComponent
  ]
})
export class BankItemModule { }
