import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { AccessService } from 'src/app/shared/utils/services/access.service';
import { Auth } from '../models/auth.model';
import { Login } from '../models/login.model';
import { DataResponse } from 'src/app/shared/utils/models/data-response';
import { Client } from 'src/app/client/utils/models/client';

@Injectable({
  providedIn: 'root'
})
export class AuthAccessService {
  constructor(
    private accessService: AccessService
  ) {}

  login(auth: Login) {  
    const { data: client } = this.accessService.get<Client>('clients', { email: auth.email });
    const response: DataResponse<Auth>  = { success: true, data: { client, token: 'This is token' }};
    return of(response);
  }

  getPassword(email: string) {  
    const response: DataResponse<string>  = { success: true, data: '12345' };  
    return of(response);
  }
}
