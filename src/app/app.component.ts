import { Component, Inject, OnInit } from '@angular/core';
import { UnSubscriber } from './shared/utils/services/unsubscriber.service';
import { AppState } from './app.state';
import { Store } from '@ngrx/store';
import { selectActiveAuth } from './auth/utils/store/auth-store.selector';
import { AuthAccessService } from './auth/utils/access/auth-access.service';
import { Router } from '@angular/router';
import { DOCUMENT } from '@angular/common';
import { Auth } from './auth/utils/models/auth.model';
import { GetAuthAction } from './auth/utils/store/auth-store.action';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent  extends UnSubscriber implements OnInit {
  auth: Auth | undefined;
  notApp = false;
  notAppUrl = ['/', '/404'];

  constructor(
    private store: Store<AppState>,
    private authAccessService: AuthAccessService,
    @Inject(DOCUMENT) private document: Document,
    private router: Router,
  ) {
    super();
  }

  ngOnInit(): void {
    this.store.dispatch(new GetAuthAction());
    this.newSubscription = this.store.select(selectActiveAuth).subscribe(auth => {
      this.auth = auth      
    });

    this.newSubscription = this.router.events.subscribe((event) => {
      this.notApp = !this.notAppUrl.includes(this.document.location.pathname);
    });
  }
}
