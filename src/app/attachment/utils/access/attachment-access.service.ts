import { Injectable } from '@angular/core';
import { AccessService } from 'src/app/general/utils/services/access.service';
import { UploadData } from '../models/upload-data';
import { Attachment } from '../models/attachment';
import { catchError, map, mergeMap, throwError } from 'rxjs';
import { AttachmentVersion } from '../models/attachment-version';
import { Update } from '@ngrx/entity';
import { AttachmentType } from '../models/attachment-type';

@Injectable({
  providedIn: 'root'
})
export class AttachmentAccessService {
  domain = 'attachments';

  constructor(
    private accessService: AccessService,
  ) {}

  private addAttachmentVersion(uploadData: UploadData, versions: AttachmentVersion[] = []) {
    const latest = versions.length;
    const latestVersion = versions[latest - 1];
    const { data, ...attachment } = uploadData;
    const { name, model, modelId } = attachment;

    const url = data ? data : localStorage.getItem(`${latestVersion?.path}`) as string
    const path = `${model}/${modelId}/${ name ? `${name}/` : ''}${latest}`;
    localStorage.setItem(path, url);

    versions = versions.map(v => {
      delete v.url;
      return v;
    });    
    
    versions.push({ _v: latest, path, date: new Date(), previews: [] });
    return { ...attachment, versions } as Partial<Attachment>;
  }

  uploadAttachment(uploadData: UploadData) {            
    const { _id } = uploadData;
    return this.accessService.findOne<Attachment>(this.domain, { _id })
      .pipe(
        map(({ data: attachment }) => {
          const { versions } = attachment;
          return this.addAttachmentVersion({ ...uploadData}, versions);
        }),
        mergeMap((attachmentData) => this.accessService.updateOne(this.domain, { _id }, attachmentData)),
        catchError((error) => {                    
          if (error === 'Not found') {
            const newAttachment = this.addAttachmentVersion(uploadData); 
            return this.accessService.insertOne(this.domain, newAttachment);
          } else {
            return throwError(error);
          }
        }),
        mergeMap(({ data }) => {
          return this.getAttachment(data._id);
        })
      )
  }

  getAttachment(id: string) {        
    return this.accessService.findOne<Attachment>(this.domain, { _id: id })
      .pipe(
        map(response => {
          response.data.versions = response.data.versions.map(version => {
            version.url = localStorage.getItem(`${version.path}`) as string
            return version;
          });
          return response;
        })
      );
  }

  listAttachments(model: AttachmentType, modelId: string, limit = 10, skip = 0) {
    return this.accessService.find<Attachment[]>(this.domain, { model, modelId })
      .pipe(
        map(response => {
          response.data = response.data.map(attachment => {            
            attachment.versions = attachment.versions.map(version => {
              version.url = localStorage.getItem(`${version.path}`) as string
              return version;
            })
            return attachment;
          });

          return response;
        })
      ); 
  }

  updateAttachment(data: Update<Attachment>) {    
    const response = this.accessService.updateOne<Attachment>(this.domain, { _id: data.id }, data.changes);
    return response;
  }

  deleteAttachment(id: string) {        
    const response = this.accessService.removeOne<Attachment>(this.domain, { _id: id });
    return response;
  }
}
