import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.state';
import { AuthAccessService } from 'src/app/auth/utils/access/auth-access.service';

@Component({
  selector: 'app-client-profile',
  templateUrl: './client-profile.component.html',
  styleUrls: ['./client-profile.component.scss']
})
export class ClientProfileComponent implements OnInit {
  constructor(
    private store: Store<AppState>,
    private authAccessService: AuthAccessService
  ) {

  }

  ngOnInit(): void {
    
  }
}
