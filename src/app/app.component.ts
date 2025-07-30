import { Component, ElementRef, Inject, OnInit } from '@angular/core';
import { BaseComponent } from './general/utils/services/basecomponent.service';
import { AppState } from './app.state';
import { Store } from '@ngrx/store';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { DOCUMENT } from '@angular/common';
import { filter } from 'rxjs';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent  extends BaseComponent implements OnInit {
  constructor(
  ) {
    super();
  }

  ngOnInit(): void {

  }
}
