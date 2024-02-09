import { DOCUMENT } from '@angular/common';
import { Component, ElementRef, Inject, OnChanges, OnInit } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, ChildActivationEnd, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.state';
import { AuthAccessService } from 'src/app/auth/utils/access/auth-access.service';
import { UnSubscriber } from 'src/app/shared/utils/services/unsubscriber.service';
import { Client } from '../../utils/models/client';

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
    private activatedRoute: ActivatedRoute,
    private el: ElementRef,
  ) {
    super();
  }

  ngOnInit(): void {
    this.chooseTab();
    this.router.events.subscribe(event => {
      if (event.type === 1) {        
        this.chooseTab();
      }
    });

    const [section, ..._] = location.pathname.split('/').reverse();
    this.selectedTab = this.tabs.indexOf(section);    
  }

  navigate (name: string) {    
    this.router.navigateByUrl(`/clients/profile/${name}`);
  }

  chooseTab() {
    if (location.pathname === '/clients/profile') {
      this.navigate(this.tabs[0]);
    }
  }
}

