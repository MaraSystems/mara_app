import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RevisionItemComponent } from './revision-item.component';
import { DirectivesModule } from 'src/app/general/utils/directives/directives.module';
import { RevisionCommentModule } from '../revision-comment/revision-comment.module';
import { MoreModule } from "../../../general/ui/more/more.module";


@NgModule({
  declarations: [
    RevisionItemComponent,
  ],
  imports: [
    CommonModule,
    DirectivesModule,
    RevisionCommentModule,
    MoreModule
],
  exports: [
    RevisionItemComponent
  ]
})
export class RevisionItemModule { }
