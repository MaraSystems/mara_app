import { Component, Inject, OnInit } from '@angular/core';
import { UnSubscriber } from './general/utils/services/unsubscriber.service';
import { AppState } from './app.state';
import { Store } from '@ngrx/store';
import { selectActiveAuth } from './auth/utils/store/auth-store.selector';
import { AuthAccessService } from './auth/utils/access/auth-access.service';
import { Router } from '@angular/router';
import { DOCUMENT } from '@angular/common';
import { Auth } from './auth/utils/models/auth.model';
import { GetAuthAction } from './auth/utils/store/auth-store.action';
import { GetClientAction } from './client/utils/store/client-store.action';
import { selectClientById } from './client/utils/store/client-store.selector';
import { OnboardEnum } from './profile/utils/onboard.enum';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent  extends UnSubscriber implements OnInit {
  auth!: Auth;
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
      this.auth = auth;
      if (this.auth) {
        this.onboardClient();
      }
    });

    this.newSubscription = this.router.events.subscribe((event) => {
      this.notApp = !this.notAppUrl.includes(this.document.location.pathname) && !!this.auth;
    });
  }

  onboardClient() {
    this.store.dispatch(new GetClientAction(this.auth.id, true));
    this.newSubscription = this.store.select(selectClientById(this.auth.id)).subscribe(client => {
      if (client.onboard !== OnboardEnum.COMPLETED) {
        this.router.navigateByUrl('/profile/create');
      }
    });
  }
}
