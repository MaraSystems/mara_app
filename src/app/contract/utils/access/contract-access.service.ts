import { Injectable } from '@angular/core';
import { AccessService } from 'src/app/general/utils/services/access.service';
import { DataResponse } from 'src/app/general/utils/models/data-response';
import { catchError, concatMap, map, mergeMap, of, tap, throwError, toArray } from 'rxjs';
import { Update } from '@ngrx/entity';
import { ListOptions } from 'src/app/general/utils/models/list-options';
import { Contract } from '../models/contract';
import { ContractStatus } from '../models/contract-status';
import { Project } from 'src/app/project/utils/models/project';
import { ContractDeliverableAccessService } from 'src/app/contract-deliverable/utils/access/contract-deliverable-access.service';
import { NotificationAccessService } from 'src/app/notification/utils/access/notification-access.service';
import { ProjectAccessService } from 'src/app/project/utils/access/project-access.service';
import { Notification } from 'src/app/notification/utils/models/notification';
import { NotificationType } from 'src/app/notification/utils/models/notification-type';
import { NotificationStatusType } from 'src/app/notification/utils/models/notification-status-type';
import { ComplianceAccessService } from 'src/app/profile/features/compliance/utils/access/compliance-access.service';
import { ComplianceTitleEnum } from 'src/app/client/utils/models/compliance';
import { TransactionAccessService } from 'src/app/transaction/utils/access/transaction-access.service';
import { Transaction } from 'src/app/transaction/utils/models/transaction';
import { WalletTransaction } from 'src/app/dashboard/utils/models/wallet-transaction';
import { TransactionAction } from 'src/app/transaction/utils/models/transaction-action';
import { TransactionType } from 'src/app/transaction/utils/models/transaction-type';
import { TransactionPlatform } from 'src/app/transaction/utils/models/transaction-platform';
import { AttachmentAccessService } from 'src/app/attachment/utils/access/attachment-access.service';
import { Attachment } from 'src/app/attachment/utils/models/attachment';
import { ContractRequest } from '../models/contract-request';

@Injectable({
  providedIn: 'root'
})
export class ContractAccessService {
  domain = 'contracts';

  constructor(
    private accessService: AccessService,
    private contractDeliverableService: ContractDeliverableAccessService,
    private notificationService: NotificationAccessService,
    private projectService: ProjectAccessService,
    private transactionService: TransactionAccessService,
    private complianceService: ComplianceAccessService,
    private attachmentService: AttachmentAccessService
  ) {}

  requestContract(data: ContractRequest) {
    let response: DataResponse<Contract>;
    let project: Project;
    return this.projectService.getProject(data.projectId)
      .pipe(
        tap(({ data: contractProject }) => project = contractProject),
        mergeMap(({ data: project }) => this.accessService.insertOne<Contract>(this.domain, {
          title: project.title,
          description: project.description,
          clientId: data.clientId,
          contractorId: project.userId,
          projectId: project._id,
          image: project.image,
          status: ContractStatus.REQUESTED
        } as Partial<Contract>)),
        tap(contractResponse => response = contractResponse),
        concatMap(() => data.deliverables),
        mergeMap((deliverableId) => this.contractDeliverableService.createContractDeliverable(deliverableId, response.data._id)),
      ).pipe(
        toArray(),
        mergeMap(() => this.notificationService.createNotification({ 
          subject: 'Contract Request',
          description: `A contract request has been made on your project ${project.title}`,
          model: NotificationType.CONTRACT,
          modelId: response.data._id,
          users: [{ status: NotificationStatusType.PENDING, userId: project.userId }],
          hidden: false,
          links: [{ title: 'Open Request', url: `http://${location.host}/contracts/${response.data._id}`}]
         } as Notification)),
         map(() => response)
      )
  }

  getContract(id: string) {    
    const response = this.accessService.findOne<Contract>(this.domain, { _id: id });
    return response;
  }

  listContracts(userId: string, data: ListOptions) {
    const response = this.accessService.find<[Contract]>(this.domain, { '@or': { clientId: userId, contractorId: userId } });
    return response;
  }

  updateContract(data: Update<Contract>) {    
    return this.getContract(data.id as string)
      .pipe(
        mergeMap(({ data: contract }) => {
          if (data.changes.status) {
            if (data.changes.status === ContractStatus.APPROVED) {
              return this.approveContract(contract, data.changes)
            }

            if (data.changes.status === ContractStatus.INITIATED) {
              return this.initiateContract(contract, data.changes)
            }

            if (data.changes.status === ContractStatus.TERMINATED) {
              return this.terminateContract(contract, data.changes)
            }
          }
          return this.accessService.updateOne<Contract>(this.domain, { _id: data.id }, data.changes);
        }),
        catchError((e) => throwError(e))
      )
  }

  private approveContract(contract: Contract, update: Partial<Contract>) {
    let response: DataResponse<Contract>;
    return this.complianceService.checkCompliance(contract.contractorId, ComplianceTitleEnum.SIGNATURE)
      .pipe(
        mergeMap(({ data: compliance }) => this.attachmentService.getAttachment(compliance.attachment)),
        mergeMap(({ data: attachment }) => this.accessService.updateOne<Contract>(this.domain, { _id: contract._id }, { ...update, approvedAt: new Date(), contractorSignature: { version: attachment.versions.length - 1, attachment: attachment._id }})),
        tap((r) => response = r),
        mergeMap(() => this.notificationService.createNotification({ 
          subject: 'Contract Approval',
          description: `The contract ${contract.title} has been approved by the contractor`,
          model: NotificationType.CONTRACT,
          modelId: response.data._id,
          users: [
            { status: NotificationStatusType.PENDING, userId: contract.clientId },
            { status: NotificationStatusType.PENDING, userId: contract.contractorId }
          ],
          hidden: false,
          links: [{ title: 'Open Contract', url: `http://${location.host}/contracts/${response.data._id}`}]
         } as Notification)),
         map(() => response)
      )
  }

  private terminateContract(contract: Contract, update: Partial<Contract>) {
    return this.accessService.updateOne<Contract>(this.domain, { _id: contract._id }, { ...update, terminatedAt: new Date()});
  }

  private initiateContract(contract: Contract, update: Partial<Contract>) {
    let contractCost = 0;
    let attachment: Attachment;
    let response: DataResponse<Contract>;

    return this.complianceService.checkCompliance(contract.clientId, ComplianceTitleEnum.SIGNATURE)
      .pipe(
        mergeMap(({ data: compliance }) => this.attachmentService.getAttachment(compliance.attachment)),
        tap(({ data }) => attachment = data),
        mergeMap(() => this.contractDeliverableService.listContractDeliverables(contract._id)),
        mergeMap(({ data: deliverables }) => {
          contractCost = deliverables.reduce((acc, red) => acc + Number(red.price), 0);
          const transaction: WalletTransaction = { userId: contract.clientId, amount: contractCost, action: TransactionAction.DEBIT };
          return this.transactionService.updateWallet(transaction);
        }),
        mergeMap(() => this.transactionService.createTransaction({ 
          balance: contractCost, 
          model: TransactionType.CONTRACT, 
          modelId: contract._id, 
          amount: contractCost, 
          action: TransactionAction.CREDIT,
          title: 'Contract Deposit', 
          platform: TransactionPlatform.CONTRACTOR
        } as Transaction)),
        mergeMap(() => this.accessService.updateOne<Contract>(this.domain, { _id: contract._id }, { ...update, initiatedAt: new Date(), clientSignature: { version: attachment.versions.length - 1, attachment: attachment._id }})),
        tap((r) => response = r),
        mergeMap(() => this.notificationService.createNotification({ 
          subject: 'Contract Initiated',
          description: `The contract ${contract.title} has been initiated by the client`,
          model: NotificationType.CONTRACT,
          modelId: response.data._id,
          users: [
            { status: NotificationStatusType.PENDING, userId: contract.clientId },
            { status: NotificationStatusType.PENDING, userId: contract.contractorId }
          ],
          hidden: false,
          links: [{ title: 'Open Contract', url: `http://${location.host}/contracts/${response.data._id}`}]
         } as Notification)),
         map(() => response)
      )
  }
}
