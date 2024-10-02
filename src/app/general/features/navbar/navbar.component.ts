import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.state';
import { AddToast } from '../toast/utils/store/toast.action';
import { LogoutAuthAction } from 'src/app/auth/utils/store/auth-store.action';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  constructor(
    private store: Store<AppState>,
    private router: Router
  ) {}

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

