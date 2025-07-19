import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserListComponent } from './user-list.component';
import { TextInputModule } from 'src/app/general/ui/text-input/text-input.module';
import { UserListRoutingModule } from './user-list-routing.module';
import { AltAuthModule } from 'src/app/auth/ui/alt-auth/alt-auth.module';
import { ReactiveFormsModule } from '@angular/forms';
import { TableHeaderModule } from 'src/app/general/ui/table-header/table-header.module';
import { EmptyModule } from 'src/app/general/ui/empty/empty.module';
import { UserItemModule } from "../../ui/user-item/user-item.module";


@NgModule({
  declarations: [
    UserListComponent
  ],
  imports: [
    CommonModule,
    TextInputModule,
    AltAuthModule,
    UserListRoutingModule,
    ReactiveFormsModule,
    TableHeaderModule,
    EmptyModule,
    UserItemModule
],
  exports: [
    UserListComponent
  ]
})
export class UserListModule { }
