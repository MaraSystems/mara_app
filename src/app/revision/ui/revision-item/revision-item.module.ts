import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RevisionItemComponent } from './revision-item.component';
import { DirectivesModule } from 'src/app/general/utils/directives/directives.module';



@NgModule({
  declarations: [
    RevisionItemComponent,
  ],
  imports: [
    CommonModule,
    DirectivesModule
  ],
  exports: [
    RevisionItemComponent
  ]
})
export class RevisionItemModule { }
