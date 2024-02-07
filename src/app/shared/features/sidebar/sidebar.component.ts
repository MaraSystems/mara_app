import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.state';
import { LogoutAuthAction } from 'src/app/auth/utils/store/auth-store.action';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  openSidebar = true;

  constructor(
    private store: Store<AppState>
  ) {}

  logout() {
    this.store.dispatch(new LogoutAuthAction());
  }
}
