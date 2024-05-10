import { Injectable } from '@angular/core';
import { Client } from '../models/client';
import { NewClient } from '../models/new-client';
import { AccessService } from 'src/app/general/utils/services/access.service';
import { Collection } from '@black-ink/lonedb';
import { DataResponse } from 'src/app/general/utils/models/data-response';
import { of } from 'rxjs';
import { Update } from '@ngrx/entity';
import { ListOptions } from 'src/app/general/utils/models/list-options';

@Injectable({
  providedIn: 'root'
})
export class ClientAccessService {
  domain = 'clients';

  constructor(
    private accessService: AccessService
  ) {}

  registerClient(data: NewClient) {        
    const response = this.accessService.insertOne<Client>(this.domain, data);
    return response;
  }

  getClient(id: string) {    
    const response = this.accessService.findOne<Client>(this.domain, { _id: id });
    return response;
  }

  updateClient(data: Update<Client>) {    
    const response = this.accessService.updateOne<Client>(this.domain, { _id: data.id }, data.changes);    
    return response;
  }

  listClients(query: any = {}, aggregation: any = {}, options: ListOptions = {}) {
    const response = this.accessService.find<[Client]>(this.domain, { hidden: false, ...query }, aggregation, options);
    return response;
  }
}
