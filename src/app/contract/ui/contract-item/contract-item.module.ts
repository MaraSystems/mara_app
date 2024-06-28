import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContractItemComponent } from './contract-item.component';
import { DirectivesModule } from 'src/app/general/utils/directives/directives.module';


@NgModule({
  declarations: [
    ContractItemComponent
  ],
  imports: [
    CommonModule,
    DirectivesModule
  ],
  exports: [
    ContractItemComponent
  ]
})
export class ContractItemModule { }
