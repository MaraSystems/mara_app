import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RevisionAmmendComponent } from './revision-ammend.component';
import { DirectivesModule } from 'src/app/general/utils/directives/directives.module';



@NgModule({
  declarations: [
    RevisionAmmendComponent,
  ],
  imports: [
    CommonModule,
    DirectivesModule,
],
  exports: [
    RevisionAmmendComponent
  ]
})
export class RevisionItemModule { }
