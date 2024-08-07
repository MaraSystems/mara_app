import { Injectable } from '@angular/core';
import { AccessService } from 'src/app/general/utils/services/access.service';
import { UploadData } from '../models/upload-data';
import { Attachment } from '../models/attachment.model';
import { catchError, map, merge, mergeMap, tap, throwError } from 'rxjs';
import { AttachmentModelEnum } from '../models/attachment-model.enum';

@Injectable({
  providedIn: 'root'
})
export class AttachmentAccessService {
  domain = 'attachments';

  constructor(
    private accessService: AccessService,
  ) {}

  private setAttachment(uploadData: UploadData, version: number) {
    const { name, model, modelId, data: url } = uploadData;
    const path = `${model}/${modelId}/${ name ? `${name}/` : ''}${version}`;
    localStorage.setItem(path, url);
    return { name, model, modelId, version, path } as Partial<Attachment>;
  }

  uploadAttachment(uploadData: UploadData) {            
    const { _id } = uploadData;
    return this.accessService.findOne<Attachment>(this.domain, { _id })
      .pipe(
        map(({ data: attachment }) => {
          const { version: latest } = attachment;
          return this.setAttachment(uploadData, latest + 1);
        }),
        mergeMap((attachmentData) => this.accessService.updateOne(this.domain, { _id }, attachmentData)),
        catchError((error) => {          
          if (error === 'Not found') {
            return this.accessService.insertOne(this.domain, this.setAttachment(uploadData, 0));
          } else {
            return throwError(error);
          }
        })
      )
  }

  getAttachment(id: string) {    
    return this.accessService.findOne<Attachment>(this.domain, { _id: id })
      .pipe(
        map(response => {
          const { path } = response.data;
          const url = localStorage.getItem(`${path}`) as string;
          response.data.url = url;
          return response;
        })
      );
  }

  listAttachments(model: string, modelId: string, limit = 10, skip = 0) {
    const response = this.accessService.find<Attachment[]>(this.domain, { model, modelId });    
    return response;
  }

  deleteAttachment(id: string) {    
    const response = this.accessService.removeOne<Attachment>(this.domain, { _id: id });
    return response;
  }
}
