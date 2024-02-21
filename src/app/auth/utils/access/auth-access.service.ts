import { Injectable } from '@angular/core';
import { map, of, throwError } from 'rxjs';
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
  auth!: Auth;

  constructor(
    private accessService: AccessService,
    private store: Store<AppState>
  ) {
    super();
  }

  login(auth: Login) {  
    return this.accessService.get<Client>('clients', { email: auth.email }).pipe(
      map(({ data: client, success }) => {
        const response: DataResponse<Auth>  = { success, data: { id: client._id, token: 'This is token' }};
        return response;
      })
    )
  }

  getPassword(email: string) {  
    const response: DataResponse<string>  = { success: true, data: '12345' };  
    return of(response);
  }

  getAuth() {
    const text = localStorage.getItem('auth');
    if (!text) {
      return throwError(() => 'No Auth');
    }
    
    this.auth = JSON.parse(text as string);
    return of({ success: true, data: this.auth });
  }

  logout() {
    return of(true);
  }
}
