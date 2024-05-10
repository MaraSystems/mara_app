import { Injectable } from '@angular/core';
import { AccessService } from 'src/app/general/utils/services/access.service';
import { Update } from '@ngrx/entity';
import { ListOptions } from 'src/app/general/utils/models/list-options';
import { Share } from '../models/share.model';
import { map, mergeMap, of, tap } from 'rxjs';
import { DataResponse } from 'src/app/general/utils/models/data-response';

@Injectable({
  providedIn: 'root'
})
export class ShareAccessService {
  domain = 'shares';

  constructor(
    private accessService: AccessService
  ) {}

  createShare(data: Share) {    
    const response = this.accessService.insertOne<Share>(this.domain, data);
    return response;
  }

  getShare(id: string) {    
    const response = this.accessService.findOne<Share>(this.domain, { _id: id });
    return response;
  }

  listShares(model: string, modelId: string, data?: ListOptions) {
    const response = this.accessService.find<[Share]>(this.domain, { model, modelId, hidden: false });
    return response;
  }

  updateShare(data: Update<Share>) {    
    const response = this.accessService.updateOne<Share>(this.domain, { _id: data.id }, data.changes);
    return response;
  }

  deleteShare(id: string) {    
    const response = this.accessService.removeOne<Share>(this.domain, { _id: id });
    return response;
  }
}
