import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BotComponent } from './bot.component';
import { MessageInputModule } from 'mara-ng';



@NgModule({
  declarations: [
    BotComponent
  ],
  imports: [
    CommonModule,
    MessageInputModule
  ],
  exports: [
    BotComponent
  ]
})
export class BotModule { }
