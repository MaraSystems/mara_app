import { Injectable } from '@angular/core';
import { AccessService } from 'src/app/shared/utils/services/access.service';
import { DocumentData } from '../../models/document-data';
import { UploadData } from '../../models/upload-data';
import { DownloadData } from '../../models/download-data';

@Injectable({
  providedIn: 'root'
})
export class DocumentAccessService {
  domain = 'documents';

  constructor(
    private accessService: AccessService
  ) {}

  uploadDocument(data: UploadData) {        
    const response = this.accessService.upload(data);    
    return response;
  }

  downloadDocument(data: DownloadData) {
    const response = this.accessService.download(data);    
    return response;
  }

  getDocument(id: string) {    
    const response = this.accessService.get<DocumentData>(this.domain, { _id: id });
    return response;
  }

  listDocuments(model: string, modelId: string, limit = 10, skip = 0) {
    const response = this.accessService.list<[DocumentData]>(this.domain, { model, modelId });    
    return response;
  }

  deleteDocument(id: string) {    
    const response = this.accessService.remove<DocumentData>(this.domain, { _id: id });
    return response;
  }
}
