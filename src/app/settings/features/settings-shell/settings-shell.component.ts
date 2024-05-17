import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { UnSubscriber } from 'src/app/general/utils/services/unsubscriber.service';

@Component({
  selector: 'app-settings-shell',
  templateUrl: './settings-shell.component.html',
  styleUrls: ['./settings-shell.component.scss']
})
export class SettingsShellComponent extends UnSubscriber implements OnInit {
  constructor(
    public store: Store
  ){
    super();
  }

  ngOnInit(): void {
    
  }
}
