import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { UnSubscriber } from 'src/app/general/utils/services/unsubscriber.service';

@Component({
  selector: 'app-search-shell',
  templateUrl: './search-shell.component.html',
  styleUrls: ['./search-shell.component.scss']
})
export class SearchShellComponent extends UnSubscriber implements OnInit {
  constructor(
    public store: Store
  ){
    super();
  }

  ngOnInit(): void {
    
  }
}
