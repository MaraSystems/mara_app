import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.state';
import { BaseComponent } from '../../utils/services/basecomponent.service';

@Component({
  selector: 'app-footbar',
  templateUrl: './footbar.component.html',
  styleUrls: ['./footbar.component.scss']
})
export class FootbarComponent extends BaseComponent implements OnInit {
  active = 'dashboard';

  constructor(
    private router: Router
  ) {
    super();
  }

  ngOnInit(): void {
    this.newSubscription = this.router.events.subscribe(event => {
        const [_, domain, ...rest] = location.pathname.split('/');
        this.active = domain;        
    });
  }
}
