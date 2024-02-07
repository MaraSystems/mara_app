import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { AccessService } from 'src/app/shared/utils/services/access.service';
import { Auth } from '../models/auth.model';
import { Login } from '../models/login.model';
import { DataResponse } from 'src/app/shared/utils/models/data-response';
import { Client } from 'src/app/client/utils/models/client';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.state';
import { UnSubscriber } from 'src/app/shared/utils/services/unsubscriber.service';
import { LoginAuthActionSuccess } from '../store/auth-store.action';

@Injectable({
  providedIn: 'root'
})
export class AuthAccessService extends UnSubscriber {
  constructor(
    private accessService: AccessService,
    private store: Store<AppState>
  ) {
    super();
  }

  login(auth: Login) {  
    const { data: client } = this.accessService.get<Client>('clients', { email: auth.email });
    const response: DataResponse<Auth>  = { success: true, data: { client, token: 'This is token' }};
    return of(response);
  }

  getPassword(email: string) {  
    const response: DataResponse<string>  = { success: true, data: '12345' };  
    return of(response);
  }

  getAuth() {
    const text = localStorage.getItem('auth');
    let auth: Auth | undefined;
    if (text) {
      auth = JSON.parse(text);
      this.store.dispatch(new LoginAuthActionSuccess(auth as Auth));
    }
        
    return auth;
  }

  logout() {
    return of(true);
  }
}
