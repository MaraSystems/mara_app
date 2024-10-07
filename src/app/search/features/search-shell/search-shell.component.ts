import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { BaseComponent } from 'src/app/general/utils/services/basecomponent.service';

@Component({
  selector: 'app-search-shell',
  templateUrl: './search-shell.component.html',
  styleUrls: ['./search-shell.component.scss']
})
export class SearchShellComponent extends BaseComponent implements OnInit {
  constructor(
    public store: Store
  ){
    super();
  }

  ngOnInit(): void {
    
  }
}
