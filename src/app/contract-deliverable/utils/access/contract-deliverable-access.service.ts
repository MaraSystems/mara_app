import { Injectable } from '@angular/core';
import { AccessService } from 'src/app/general/utils/services/access.service';
import { Collection } from '@black-ink/lonedb';
import { catchError, concatMap, map, merge, mergeMap, of, tap, throwError, toArray } from 'rxjs';
import { Update } from '@ngrx/entity';
import { ContractDeliverable } from '../models/contract-deliverable';
import { AttachmentType } from 'src/app/general/features/attachment/utils/models/attachment-type';
import { ProjectDeliverableAccessService } from 'src/app/project-deliverable/utils/access/project-deliverable-access.service';
import { AttachmentAccessService } from 'src/app/general/features/attachment/utils/access/attachment-access.service';
import { UploadData } from 'src/app/general/features/attachment/utils/models/upload-data';
import { ContractDeliverableStatus } from '../models/contract-deliverable-status';
import { NotificationAccessService } from 'src/app/notification/utils/access/notification-access.service';
import { DataResponse } from 'src/app/general/utils/models/data-response';
import { NotificationType } from 'src/app/notification/utils/models/notification-type';
import { NotificationStatusType } from 'src/app/notification/utils/models/notification-status-type';
import { Notification } from 'src/app/notification/utils/models/notification';
import { ContractAccessService } from 'src/app/contract/utils/access/contract-access.service';
import { Contract } from 'src/app/contract/utils/models/contract';


@Injectable({
  providedIn: 'root'
})
export class ContractDeliverableAccessService {
  domain = 'contract-deliverables';

  constructor(
    private accessService: AccessService,
    private projectDeliverableService: ProjectDeliverableAccessService,
    private attachmentService: AttachmentAccessService,
    private notificationService: NotificationAccessService,
  ) {}

  createContractDeliverable(deliverableId: string, contractId: string) {
    let contractDeliverable: ContractDeliverable;
    return this.projectDeliverableService.getProjectDeliverable(deliverableId)
      .pipe(
        map(({ data: projectDeliverable }) => {
          const { title, description, price, duration, image } = projectDeliverable;
          const deliverableData: Partial<ContractDeliverable> = { title, description, price, duration, contractId: contractId, image, status: ContractDeliverableStatus.DRAFT };
          return deliverableData
        }),
        mergeMap((deliverableData) => this.accessService.insertOne(this.domain, deliverableData)),
        tap(({ data: deliverable }) => { 
          contractDeliverable = deliverable
        }),
        mergeMap(() => this.attachmentService.listAttachments(AttachmentType.PROJECT_DELIVERABLE, deliverableId)),
        concatMap(({ data: documents }) => documents),
        map(({ name }) => ({ name, model: AttachmentType.CONTRACT_DELIVERABLE, modelId: contractDeliverable._id } as UploadData)),
        mergeMap((attachmentData) => this.attachmentService.uploadAttachment(attachmentData)),
        map(() => contractDeliverable)
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
    return this.getContractDeliverable(data.id as string)
      .pipe(
        mergeMap(({ data: contractDeliverable }) => {
          if (data.changes.status) {
            if (data.changes.status === ContractDeliverableStatus.DRAFT) {
              return this.convertToDraft(contractDeliverable, data.changes)
            }

            if (data.changes.status === ContractDeliverableStatus.PROCESSING) {
              return this.enableReviews(contractDeliverable, data.changes)
            }

            if (data.changes.status === ContractDeliverableStatus.COMPLETED) {
              return this.markCompleted(contractDeliverable, data.changes)
            }
          }
          return this.accessService.updateOne<ContractDeliverable>(this.domain, { _id: data.id }, data.changes);
        }),
        catchError((e) => throwError(e))
      )
  }

  private convertToDraft(deliverable: ContractDeliverable, update: Partial<ContractDeliverable>) {
    return this.attachmentService.listAttachments(AttachmentType.CONTRACT_DELIVERABLE, deliverable._id)
      .pipe(
        mergeMap(({ data: attachmentList}) => {
          const hasChanges = attachmentList.some(attachment => attachment.versions.length > 1);
          if (!hasChanges) {
            throw new Error('Deliverable has no changes');
          }
          return this.accessService.updateOne<ContractDeliverable>(this.domain, { _id: deliverable._id }, update);
        })
      );
  }

  private enableReviews(deliverable: ContractDeliverable, update: Partial<ContractDeliverable>) {
    let response: DataResponse<ContractDeliverable>;
    return this.attachmentService.listAttachments(AttachmentType.CONTRACT_DELIVERABLE, deliverable._id)
      .pipe(
        map(({ data: attachmentList}) => {
          const hasChanges = attachmentList.some(attachment => attachment.versions.length > 1);
          if (!hasChanges) {
            throw new Error('Deliverable has no changes');
          }
        }),
        mergeMap(() => this.accessService.updateOne<ContractDeliverable>(this.domain, { _id: deliverable._id }, update)),
        tap((r) => response = r),
        mergeMap(() => this.accessService.find<Contract>('contracts', deliverable.contractId)),
        map(({ data: contract }) => this.notificationService.createNotification({ 
          subject: 'Enable Deliverable Review',
          description: `The contract deliverable ${deliverable.title} has been enabled for review by the contractor`,
          model: NotificationType.CONTRACT_DELIVERABLE,
          modelId: response.data._id,
          users: [
            { status: NotificationStatusType.PENDING, userId: contract.clientId },
            { status: NotificationStatusType.PENDING, userId: contract.contractorId }
          ],
          hidden: false,
          links: [{ title: 'Open Contract Deliverable', url: `http://${location.host}/contracts/${response.data.contractId}/deliverables/${response.data._id}`}]
         } as Notification)),
         map(() => response)
      );
  }

  private markCompleted(deliverable: ContractDeliverable, update: Partial<ContractDeliverable>) {
    let response: DataResponse<ContractDeliverable>;
    return this.attachmentService.listAttachments(AttachmentType.CONTRACT_DELIVERABLE, deliverable._id)
      .pipe(
        mergeMap(({ data: attachmentList}) => {
          const hasChanges = attachmentList.some(attachment => attachment.versions.length > 1);
          if (!hasChanges) {
            throw new Error('Deliverable has no changes');
          }
          return this.accessService.updateOne<ContractDeliverable>(this.domain, { _id: deliverable._id }, update);
        }),
        tap((r) => response = r),
        mergeMap(() => this.accessService.find<Contract>('contracts', deliverable.contractId)),
        map(({ data: contract }) => this.notificationService.createNotification({ 
          subject: 'Complete Deliverable',
          description: `The contract deliverable ${deliverable.title} has been completed by the contractor`,
          model: NotificationType.CONTRACT_DELIVERABLE,
          modelId: response.data._id,
          users: [
            { status: NotificationStatusType.PENDING, userId: contract.clientId },
            { status: NotificationStatusType.PENDING, userId: contract.contractorId }
          ],
          hidden: false,
          links: [{ title: 'Open Contract Deliverable', url: `http://${location.host}/contracts/${response.data.contractId}/deliverables/${response.data._id}`}]
         } as Notification)),
         map(() => response)
      );
  }
}
