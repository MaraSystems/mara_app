import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserItemComponent } from './user-item.component';
import { DirectivesModule } from 'src/app/general/utils/directives/directives.module';


@NgModule({
  declarations: [
    UserItemComponent
  ],
  imports: [
    CommonModule,
    DirectivesModule
  ],
  exports: [
    UserItemComponent
  ]
})
export class UserItemModule { }
