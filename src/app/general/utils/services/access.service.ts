import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Actions } from '@ngrx/effects';
import { LocalAccessService } from './local-access.service';
import { Store } from '@ngrx/store';
import { EnvTypes } from '../models/env';
import { ApiAccessService } from './api-access.service';
import { IAccessService } from './iaccess.service';

@Injectable({
  providedIn: 'root'
})
export class AccessService {
  api!: IAccessService;

  constructor(
      localAccessService: LocalAccessService,
      apiAccessService: ApiAccessService,
  ){
    // this.accessService = [EnvTypes.DEVELOPMENT, EnvTypes.TESTING].includes(environment.env)
    //   ? localAccessService
    //   : apiAccessService;

    this.api = localAccessService;
  }
}
