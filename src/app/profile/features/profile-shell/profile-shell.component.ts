import { DOCUMENT } from '@angular/common';
import { Component, ElementRef, Inject, OnChanges, OnInit } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, ChildActivationEnd, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.state';
import { Client } from 'src/app/client/utils/models/client';
import { selectAuthClient } from 'src/app/client/utils/store/client-store.selector';
import { UnSubscriber } from 'src/app/shared/utils/services/unsubscriber.service';

@Component({
  selector: 'app-profile-shell',
  templateUrl: './profile-shell.component.html',
  styleUrls: ['./profile-shell.component.scss']
})
export class ProfileShellComponent extends UnSubscriber implements OnInit {
  profile!: Client;
  tabs = ['info', 'interests', 'kin', 'status'];
  selectedTab = 0;
  showMore = false;
    
  constructor(
    private router: Router,
    private store: Store<AppState>
  ) {
    super();
  }

  ngOnInit(): void {
    this.chooseTab();
    const [section, ..._] = location.pathname.split('/').reverse();
    this.selectedTab = this.tabs.indexOf(section);    
  }

  navigate (name: string) {    
    this.router.navigateByUrl(`/profile/${name}`);
  }

  chooseTab() {
    if (location.pathname === '/profile') {
      this.navigate(this.tabs[0]);
    }
  }
}

