import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Client } from 'src/app/client/utils/models/client';
import { More } from 'src/app/shared/utils/models/more.model';
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
  moreList: More[] = [
    { name: 'Update Profile', icon: 'grid_view', link: 'profile/info;edit=1' },
    { name: 'Update Kin', icon: 'grid_view', link: 'profile/kin;edit=1' },
    { name: 'Set Image', icon: 'grid_view', link: '' },
    { name: 'Dashboard', icon: 'grid_view', link: '' }
  ];
    
  constructor(
    private router: Router,
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

