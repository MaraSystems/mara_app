import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { UnSubscriber } from 'src/app/general/utils/services/unsubscriber.service';

@Component({
  selector: 'app-notification-shell',
  templateUrl: './notification-shell.component.html',
  styleUrls: ['./notification-shell.component.scss']
})
export class NotificationShellComponent extends UnSubscriber implements OnInit {
  constructor(
    public store: Store
  ){
    super();
  }

  ngOnInit(): void {
    
  }
}
