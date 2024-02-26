import { Injectable } from '@angular/core';
import { Client } from '../models/client';
import { NewClient } from '../models/new-client';
import { AccessService } from 'src/app/shared/utils/services/access.service';
import { Collection } from '@black-ink/lonedb';
import { DataResponse } from 'src/app/shared/utils/models/data-response';
import { of } from 'rxjs';
import { Update } from '@ngrx/entity';

@Injectable({
  providedIn: 'root'
})
export class ClientAccessService {
  collection = new Collection<Client>('clients');

  constructor(
    private accessService: AccessService
  ) {}

  registerClient(data: NewClient) {        
    const response = this.accessService.insert<Client>('clients', data);
    return of(response);
  }

  getClient(id: string) {    
    const response = this.accessService.get<Client>('clients', { _id: id });
    return response;
  }

  updateClient(data: Update<Client>) {    
    const response = this.accessService.update<Client>('clients', { _id: data.id }, data.changes);
    console.log(response);
    
    return of(response);
  }
}
