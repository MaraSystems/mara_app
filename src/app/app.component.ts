import { Component, ElementRef, Inject, OnInit } from '@angular/core';
import { BaseComponent } from './general/utils/services/basecomponent.service';
import { AppState } from './app.state';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { DOCUMENT } from '@angular/common';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent  extends BaseComponent implements OnInit {
  notAppUrl = ['/', '/404'];

  constructor(
    private store: Store<AppState>,
    @Inject(DOCUMENT) private document: Document,
    private el: ElementRef,
    private router: Router,
  ) {
    super();
  }

  ngOnInit(): void {

  }
}
