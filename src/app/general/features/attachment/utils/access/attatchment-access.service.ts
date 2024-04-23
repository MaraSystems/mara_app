import { Injectable } from '@angular/core';
import { AccessService } from 'src/app/general/utils/services/access.service';
import { UploadData } from '../models/upload-data';
import { DownloadData } from '../models/download-data';
import { Attachment } from '../models/attatchment.model';

@Injectable({
  providedIn: 'root'
})
export class AttachmentAccessService {
  domain = 'attachments';

  constructor(
    private accessService: AccessService
  ) {}

  uploadAttachment(data: UploadData) {        
    const response = this.accessService.upload(data);    
    return response;
  }

  downloadAttachment(data: DownloadData) {
    const response = this.accessService.download(data);    
    return response;
  }

  getAttachment(id: string) {    
    const response = this.accessService.findOne<Attachment>(this.domain, { _id: id });
    return response;
  }

  listAttachments(model: string, modelId: string, limit = 10, skip = 0) {
    const response = this.accessService.find<[Attachment]>(this.domain, { model, modelId });    
    return response;
  }

  deleteAttachment(id: string) {    
    const response = this.accessService.removeOne<Attachment>(this.domain, { _id: id });
    return response;
  }
}
