import { Injectable } from '@angular/core';
import { Client } from '../models/client';
import { AccessService } from 'src/app/shared/access.service';
import { NewClient } from '../models/new-client';

@Injectable({
  providedIn: 'root'
})
export class ClientAccessService {
  constructor(
    private accessService: AccessService
  ) {}

  registerClient(client: Client) {
    return this.accessService.request<Client, NewClient>('post', 'clients', client);
  }
}
