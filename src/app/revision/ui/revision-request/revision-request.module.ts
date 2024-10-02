import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RevisionRequestComponent } from './revision-request.component';
import { DirectivesModule } from 'src/app/general/utils/directives/directives.module';



@NgModule({
  declarations: [
    RevisionRequestComponent,
  ],
  imports: [
    CommonModule,
    DirectivesModule,
],
  exports: [
    RevisionRequestComponent
  ]
})
export class RevisionItemModule { }
