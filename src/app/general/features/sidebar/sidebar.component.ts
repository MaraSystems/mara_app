import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.state';
import { LogoutAuthAction } from 'src/app/auth/utils/store/auth-store.action';
import { UnSubscriber } from '../../utils/services/unsubscriber.service';
import { AddToast } from '../toast/utils/store/toast.action';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent extends UnSubscriber implements OnInit {
  openSidebar = true;
  active = 'dashboard';

  constructor(
    private store: Store<AppState>,
    private router: Router
  ) {
    super();
  }

  ngOnInit(): void {
    this.newSubscription = this.router.events.subscribe(event => {
        const [_, domain, ...rest] = location.pathname.split('/');
        this.active = domain
    });
  }

  logout() {
    this.store.dispatch(new LogoutAuthAction({
      success: () => {        
        this.store.dispatch(new AddToast({ title: 'Logout successful' }));
        this.router.navigateByUrl('/auth');
      },
      failure: () => {
        this.store.dispatch(new AddToast({ title: 'Logout failed' }));
      }
    }));
  }
}
