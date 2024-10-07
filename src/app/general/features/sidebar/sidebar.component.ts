import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BaseComponent } from '../../utils/services/basecomponent.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent extends BaseComponent implements OnInit {
  active = 'dashboard';

  constructor(
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
}
