import { Component, ElementRef, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.state';
import { BaseComponent } from 'src/app/general/utils/services/basecomponent.service';
import { SendMessageAction } from '../utils/store/bot.action';
import { selectMessages } from '../utils/store/bot.selector';
import { IMessage } from '../utils/models/imessage';

@Component({
  selector: 'app-bot',
  templateUrl: './bot.component.html',
  styleUrls: ['./bot.component.scss']
})
export class BotComponent extends BaseComponent implements OnInit {
  element!: Element;
  active = false;
  messages!: IMessage[];

  constructor(
    public store: Store<AppState>,
    el: ElementRef
  ) {
    super();
    this.element = el.nativeElement;
  }

  ngOnInit(): void {
    this.newSubscription = this.store.select(selectMessages).subscribe(messages => {
      this.messages = messages;
    });
  }

  messageBot(message: string){
    this.store.dispatch(new SendMessageAction(message));
  }
}
