import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BotComponent } from './bot.component';
import { MessageInputModule } from 'src/app/general/ui/message-input/message-input.module';



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
