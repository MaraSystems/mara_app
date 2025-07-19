import { Component, ElementRef, Inject, OnInit } from '@angular/core';
import { BaseComponent } from './general/utils/services/basecomponent.service';
import { AppState } from './app.state';
import { Store } from '@ngrx/store';
import { selectActiveAuth } from './auth/utils/store/auth-store.selector';
import { Router } from '@angular/router';
import { DOCUMENT } from '@angular/common';
import { Auth } from './auth/utils/models/auth.model';
import { GetAuthAction } from './auth/utils/store/auth-store.action';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent  extends BaseComponent implements OnInit {
  auth!: Auth;
  notApp = false;
  notAppUrl = ['/', '/404'];
  showSidebar = true;

  constructor(
    private store: Store<AppState>,
    @Inject(DOCUMENT) private document: Document,
    private el: ElementRef,
    private router: Router,
  ) {
    super();
  }

  ngOnInit(): void {
    this.store.dispatch(new GetAuthAction());
    this.newSubscription = this.store.select(selectActiveAuth).subscribe(auth => {
      this.auth = auth;
    });

    this.newSubscription = this.router.events.subscribe((event) => {
      this.notApp = !this.notAppUrl.includes(this.document.location.pathname) && !!this.auth;
    });
  }

  toggleSidebar(event: MouseEvent) {
    const element: Element = this.el.nativeElement;
    const { right } = element.getBoundingClientRect();
    // this.showSidebar = (right/10) > event.clientX;
  }
}
