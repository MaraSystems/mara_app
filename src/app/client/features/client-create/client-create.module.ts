import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientCreateComponent } from './client-create.component';
import { TextInputModule } from 'src/app/general/ui/text-input/text-input.module';
import { ClientCreateRoutingModule } from './client-create-routing.module';
import { AltAuthModule } from 'src/app/auth/ui/alt-auth/alt-auth.module';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    ClientCreateComponent
  ],
  imports: [
    CommonModule,
    TextInputModule,
    AltAuthModule,
    ClientCreateRoutingModule,
    ReactiveFormsModule
  ],
  exports: [
    ClientCreateComponent
  ]
})
export class ClientCreateModule { }
