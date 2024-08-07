import { Injectable } from '@angular/core';
import { AccessService } from 'src/app/general/utils/services/access.service';
import { Collection } from '@black-ink/lonedb';
import { concatMap, map, merge, mergeMap, of, tap, toArray } from 'rxjs';
import { Update } from '@ngrx/entity';
import { ContractDeliverable } from '../models/contract-deliverable.model';
import { ProjectDeliverable } from 'src/app/project-deliverable/utils/models/project-deliverable.model';
import { Attachment } from 'src/app/general/features/attachment/utils/models/attachment.model';
import { AttachmentModelEnum } from 'src/app/general/features/attachment/utils/models/attachment-model.enum';
import { ProjectDeliverableAccessService } from 'src/app/project-deliverable/utils/access/project-deliverable-access.service';
import { AttachmentAccessService } from 'src/app/general/features/attachment/utils/access/attachment-access.service';
import { UploadData } from 'src/app/general/features/attachment/utils/models/upload-data';


@Injectable({
  providedIn: 'root'
})
export class ContractDeliverableAccessService {
  domain = 'contract-deliverables';

  constructor(
    private accessService: AccessService,
    private projectDeliverableService: ProjectDeliverableAccessService,
    private attachmentService: AttachmentAccessService
  ) {}

  createContractDeliverable(deliverableId: string, contractId: string) {
    let contractDeliverable: ContractDeliverable;
    return this.projectDeliverableService.getProjectDeliverable(deliverableId)
      .pipe(
        map(({ data: projectDeliverable }) => {
          const { title, description, price, duration, image } = projectDeliverable;
          const deliverableData: Partial<ContractDeliverable> = { title, description, price, duration, contractId: contractId, image };
          return deliverableData
        }),
        mergeMap((deliverableData) => this.accessService.insertOne(this.domain, deliverableData)),
        tap(({ data: deliverable }) => { 
          contractDeliverable = deliverable
        }),
        mergeMap(() => this.attachmentService.listAttachments(AttachmentModelEnum.PROJECT_DELIVERABLE, deliverableId)),
        concatMap(({ data: documents }) => documents),
        map(({ name }) => ({ name, model: AttachmentModelEnum.CONTRACT_DELIVERABLE, modelId: contractDeliverable._id } as UploadData)),
        mergeMap((attachmentData) => this.attachmentService.uploadAttachment(attachmentData)),
      ).pipe(
        toArray(),
        map((attachments) => attachments.map(({ data: attachment }) => attachment._id)),
        mergeMap((documentList) => this.accessService.updateOne<ContractDeliverable>(this.domain, { _id: contractDeliverable._id }, { documents: documentList }))
      )
  }

  getContractDeliverable(id: string) {    
    const response = this.accessService.findOne<ContractDeliverable>(this.domain, { _id: id });
    return response;
  }

  listContractDeliverables(contractId: string, limit = 10, skip = 0) {
    const response = this.accessService.find<ContractDeliverable[]>(this.domain, { contractId });
    return response;
  }

  updateContractDeliverable(data: Update<ContractDeliverable>) {    
    const response = this.accessService.updateOne<ContractDeliverable>(this.domain, { _id: data.id }, data.changes);
    return response;
  }
}
