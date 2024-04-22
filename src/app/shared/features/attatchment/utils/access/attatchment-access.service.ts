import { Injectable } from '@angular/core';
import { AccessService } from 'src/app/shared/utils/services/access.service';
import { UploadData } from '../models/upload-data';
import { DownloadData } from '../models/download-data';
import { Attatchment } from '../models/attatchment.model';

@Injectable({
  providedIn: 'root'
})
export class AttatchmentAccessService {
  domain = 'attatchments';

  constructor(
    private accessService: AccessService
  ) {}

  uploadAttatchment(data: UploadData) {        
    const response = this.accessService.upload(data);    
    return response;
  }

  downloadAttatchment(data: DownloadData) {
    const response = this.accessService.download(data);    
    return response;
  }

  getAttatchment(id: string) {    
    const response = this.accessService.findOne<Attatchment>(this.domain, { _id: id });
    return response;
  }

  listAttatchments(model: string, modelId: string, limit = 10, skip = 0) {
    const response = this.accessService.find<[Attatchment]>(this.domain, { model, modelId });    
    return response;
  }

  deleteAttatchment(id: string) {    
    const response = this.accessService.removeOne<Attatchment>(this.domain, { _id: id });
    return response;
  }
}
