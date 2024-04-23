import { Component, Input, OnInit } from '@angular/core';
import { UnSubscriber } from '../../utils/services/unsubscriber.service';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.state';
import { selectActiveAuth } from 'src/app/auth/utils/store/auth-store.selector';
import { Client } from 'src/app/client/utils/models/client';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
}

