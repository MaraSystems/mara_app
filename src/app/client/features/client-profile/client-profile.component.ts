import { DOCUMENT } from '@angular/common';
import { Component, ElementRef, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.state';
import { AuthAccessService } from 'src/app/auth/utils/access/auth-access.service';
import { UnSubscriber } from 'src/app/shared/utils/services/unsubscriber.service';

@Component({
  selector: 'app-client-profile',
  templateUrl: './client-profile.component.html',
  styleUrls: ['./client-profile.component.scss']
})
export class ClientProfileComponent extends UnSubscriber implements OnInit {
  tabs = ['info', 'interests', 'kin', 'status'];
  selectedTab = 0;
  showMore = false;
  
  constructor(
    private store: Store<AppState>,
    private router: Router,
    @Inject(DOCUMENT) private document: Document,
    private el: ElementRef
  ) {
    super();
  }

  ngOnInit(): void {
    const pathname = this.document.location.pathname;
    if (pathname === '/clients/profile') {
      this.navigate(this.tabs[0]);
    }

    const [section, ..._] = pathname.split('/').reverse();
    this.selectedTab = this.tabs.indexOf(section);
  }

  navigate (name: string) {    
    this.router.navigateByUrl(`/clients/profile/${name}`);
  }
}

