import { Injectable } from '@angular/core';
import { AccessService } from 'src/app/shared/utils/services/access.service';
import { Collection } from '@black-ink/lonedb';
import { of } from 'rxjs';
import { Update } from '@ngrx/entity';
import { Kin } from 'src/app/client/utils/models/kin';

@Injectable({
  providedIn: 'root'
})
export class KinAccessService {
  domain = 'kins';

  constructor(
    private accessService: AccessService
  ) {}

  createKin(data: Kin) {    
    const response = this.accessService.insert<Kin>(this.domain, data);
    return response;
  }

  getKin(userId: string) {    
    const response = this.accessService.get<Kin>(this.domain, { userId });
    return response;
  }

  updateKin(data: Update<Kin>) {    
    const response = this.accessService.update<Kin>(this.domain, { _id: data.id }, data.changes);    
    return response;
  }
}
