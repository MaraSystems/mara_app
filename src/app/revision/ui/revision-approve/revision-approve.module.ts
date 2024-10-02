import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RevisionApproveComponent } from './revision-approve.component';
import { DirectivesModule } from 'src/app/general/utils/directives/directives.module';



@NgModule({
  declarations: [
    RevisionApproveComponent,
  ],
  imports: [
    CommonModule,
    DirectivesModule,
],
  exports: [
    RevisionApproveComponent
  ]
})
export class RevisionItemModule { }
