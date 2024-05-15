import { Injectable } from '@angular/core';
import { AccessService } from 'src/app/general/utils/services/access.service';
import { Collection } from '@black-ink/lonedb';
import { of } from 'rxjs';
import { Update } from '@ngrx/entity';
import { Compliance } from 'src/app/client/utils/models/compliance';

@Injectable({
  providedIn: 'root'
})
export class ComplianceAccessService {
  domain = 'compliances';

  constructor(
    private accessService: AccessService
  ) {}

  createCompliance(data: Compliance) {    
    const response = this.accessService.insertOne<Compliance>(this.domain, data);
    return response;
  }

  getCompliance(userId: string) {    
    const response = this.accessService.findOne<Compliance>(this.domain, { userId });
    return response;
  }

  listCompliance(userId: string) {    
    const response = this.accessService.find<Compliance[]>(this.domain, { userId });
    return response;
  }

  updateCompliance(data: Update<Compliance>) {    
    const response = this.accessService.updateOne<Compliance>(this.domain, { _id: data.id }, data.changes);    
    return response;
  }
}
