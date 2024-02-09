import { Component, Inject, OnInit } from '@angular/core';
import { Client } from './client/utils/models/client';
import { UnSubscriber } from './shared/utils/services/unsubscriber.service';
import { AppState } from './app.state';
import { Store } from '@ngrx/store';
import { selectActiveAuth } from './auth/utils/store/auth-store.selector';
import { Observable, of } from 'rxjs';
import { AuthAccessService } from './auth/utils/access/auth-access.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DOCUMENT } from '@angular/common';
import { Auth } from './auth/utils/models/auth.model';
import { GetAuthAction, LoginAuthActionSuccess } from './auth/utils/store/auth-store.action';
import { AddToast } from './toast/utils/store/toast.action';
import { Toast } from './toast/features/toast.model';
import { selectClientById, selectCurrentClient } from './client/utils/store/client-store.selector';

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
    private router: Router
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

    // this.store.dispatch(new AddToast(new Toast({ duration: 0 })));
  }
}
