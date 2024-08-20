import { Injectable } from '@angular/core';
import { AccessService } from 'src/app/general/utils/services/access.service';
import { catchError, map, mergeMap, of, tap, throwError } from "rxjs";
import { Update } from '@ngrx/entity';
import { Compliance, ComplianceStatusEnum, ComplianceTitleEnum } from 'src/app/client/utils/models/compliance';
import { DataResponse } from 'src/app/general/utils/models/data-response';
import { AttachmentType } from 'src/app/general/features/attachment/utils/models/attachment-type';
import { AttachmentAccessService } from 'src/app/general/features/attachment/utils/access/attachment-access.service';
import { AddToast } from 'src/app/general/features/toast/utils/store/toast.action';

@Injectable({
  providedIn: 'root'
})
export class ComplianceAccessService {
  domain = 'compliances';

  constructor(
    private accessService: AccessService,
    private attachmentService: AttachmentAccessService,
  ) {}

  createCompliance(data: Compliance, document: string) {         
    return data._id
      ? this.uploadComplianceDocument(data, document)
      : this.accessService.insertOne<Compliance>(this.domain, data)
        .pipe(
          mergeMap(({ data: compliance }) => this.uploadComplianceDocument(compliance, document))
        )
  }

  getCompliance(id: string) {        
    const response = this.accessService.findOne<Compliance>(this.domain, { _id: id });
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

  uploadComplianceDocument(data: Compliance, document: string) {
    return this.attachmentService.uploadAttachment({ 
      data: document, model: AttachmentType.COMPLIANCE, modelId: data._id, name: '', _id: data.attachment 
    }).pipe(
      tap(({ data: uploaded }) => this.updateCompliance({ id: data._id, changes: { attachment: uploaded._id }})),
      map(({ data: uploaded }) => {
        const uploadedCompliance: DataResponse<Compliance> =  { success: true, data: { ...data, attachment: uploaded._id }};
        return uploadedCompliance;
      })
    )
  }

  checkCompliance(userId: string, title: ComplianceTitleEnum) {
    return this.accessService.findOne<Compliance>(this.domain, { userId, title })
      .pipe(
        catchError(error => throwError(`Please upload your ${title}`))
      )
  }
}
