import { Injectable } from '@angular/core';
import { DataResponse } from '../models/data-response';
import { of } from 'rxjs';
import { IQueryOption } from '@black-ink/lonedb/lib/models/query-option.interface';
import { UploadData } from '../../features/attachment/utils/models/upload-data';
import { Attachment } from '../../features/attachment/utils/models/attatchment.model';
import { DownloadData } from '../../features/attachment/utils/models/download-data';
import { AccessService } from './access.service';
import { TransactionModelEnum } from 'src/app/transaction/utils/models/transaction-model.enum';
import { Transaction } from 'src/app/transaction/utils/models/transaction.model';
import { TransactionActionEnum } from 'src/app/transaction/utils/models/transaction-action.enum';
import { Notification } from 'src/app/notification/utils/models/notification.model';
import { NotificationStatusEnum } from 'src/app/notification/utils/models/notification-status.enum';
import { Contract, ContractRequest } from 'src/app/contract/utils/models/contract.model';
import { Project } from 'src/app/project/utils/models/project.model';
import { ProjectDeliverable } from 'src/app/project-deliverable/utils/models/project-deliverable.model';
import { ContractStatus } from 'src/app/contract/utils/models/contract-status.enum';
import { ContractDeliverable } from 'src/app/contract-deliverable/utils/models/contract-deliverable.model';
import { NotificationModelEnum } from 'src/app/notification/utils/models/notification-model.enum';
import { AttachmentModelEnum } from '../../features/attachment/utils/models/attatchment-model.enum';


@Injectable({
  providedIn: 'root'
})
export class APIService {
  constructor(
    private accessService: AccessService
  ) { 
  }

  public upload(entry: UploadData) {
    const { _id, name, model, modelId, data: url } = entry;
    const collection = this.accessService.db.createCollection<Attachment>('attachments', { timestamp: true });
    const { version: latest } = collection.findOne({ _id }) || { version: -1 };
    const version = latest + 1;
    const path = `${model}/${modelId}/${ name ? `${name}/` : ''}${version}`;
    localStorage.setItem(path, url);

    const document: Partial<Attachment> = { name, model, modelId, version, path };
    const data = version 
      ? collection.updateOne({ _id }, document as Attachment)
      : collection.insertOne(document as Attachment);
    
    const response: DataResponse<Attachment> = { success: true, data };
    return of(response);
  }

  public download(query: DownloadData){
    const collection = this.accessService.db.createCollection<Attachment>('attachments', { timestamp: true });    
    const document = collection.findOne(query, { sort: { version: 'desc' } } as IQueryOption);
    console.log(document);
    
    const { path } = document;
    const url = localStorage.getItem(`${path}`) as string;
    const response: DataResponse<string> = { success: true, data: url as string };
    return of(response);
  }

  public getWallet(userId: string) {
    const collection = this.accessService.db.createCollection<Transaction>('transactions', { timestamp: true });
    const { balance } = collection.findOne({ userId, model: TransactionModelEnum.WALLET }, { sort: { createdAt: 'desc' } }) || { balance: 0.00 };
    const response: DataResponse<number> = { success: true, data: balance };
    return response;
  }

  public updateWallet(transaction: Transaction) {
    let { data: balance } = this.getWallet(transaction.userId);    
    balance = transaction.action === TransactionActionEnum.CREDIT
      ? balance + transaction.amount
      : balance - transaction.amount;

    if (balance < 0) {
      throw new Error('Insufficient Balance');
    }

    const collection = this.accessService.db.createCollection<Transaction>('transactions', { timestamp: true });
    const { balance: newBalance } = collection.insertOne({ ...transaction, balance });
    const response: DataResponse<number> = { success: true, data: newBalance };
    return response;
  }

  public requestContract(data: ContractRequest) {
    const projectCollection = this.accessService.db.createCollection<Project>('projects', { timestamp: true });
    const contractCollection = this.accessService.db.createCollection<Contract>('contracts', { timestamp: true });

    const project = projectCollection.findOne({ _id: data.projectId });
    const contractData: Partial<Contract> = {
      title: project.title,
      description: project.description,
      clientId: data.clientId,
      contractorId: project.userId,
      projectId: project._id,
      image: project.image,
      status: ContractStatus.REQUESTED
    };
    const contract = contractCollection.insertOne(contractData as Contract);
    data.deliverables.map(deliverableId => this.createContractDeliverable(deliverableId, contract._id));

    const note = `A contract request has been made on your project ${project.title}`;
    this.createNotification({ 
      subject: 'Contract Request',
      description: note,
      model: NotificationModelEnum.CONTRACT,
      modelId: contract._id,
      users: [{ status: NotificationStatusEnum.PENDING, userId: project.userId }],
      hidden: false,
      links: [{ title: 'Open Request', url: `http://${location.host}/contracts/${contract._id}`}]
     } as Notification as any);

    const response: DataResponse<Contract> = { success: true, data: contract };
    return of(response);
  }

  public createContractDeliverable(deliverableId: string, contractId: string) {
    const projectDeliverableCollection = this.accessService.db.createCollection<ProjectDeliverable>('project-deliverables', { timestamp: true });
    const contractDeliverableCollection = this.accessService.db.createCollection<ContractDeliverable>('contract-deliverables', { timestamp: true });
    const attatchmentCollection = this.accessService.db.createCollection<Attachment>('attachments', { timestamp: true });

    const deliverable = projectDeliverableCollection.findOne({ _id: deliverableId });
    const { title, description, price, duration, image } = deliverable;
    const deliverableData: Partial<ContractDeliverable> = { title, description, price, duration, contractId: contractId, image };
    const contractDeliverable = contractDeliverableCollection.insertOne(deliverableData as ContractDeliverable);
      
    const documents = attatchmentCollection.find({ model: AttachmentModelEnum.PROJECT_DELIVERABLE, modelId: deliverableId });
    const documentList = documents.map(doc => {
      const { name } = doc;
      const contractAttachment = attatchmentCollection.insertOne({ name, model: AttachmentModelEnum.CONTRACT_DELIVERABLE, modelId: contractDeliverable._id, version: -1 } as Partial<Attachment> as Attachment);
      return contractAttachment._id;
    });

    contractDeliverableCollection.updateOne({ _id: contractDeliverable._id }, { documents: documentList });    
  }

  public createNotification(data: Notification) {    
    const collection = this.accessService.db.createCollection<Notification>('notifications', { timestamp: true });
    const notification = collection.insertOne(data);        
    return of(notification);
  }

  public readNotification(id: string, userId: string) {
    const collection = this.accessService.db.createCollection<Notification>('notifications', { timestamp: true });
    const notification = collection.findOne({ _id: id });
    if (!notification) {
      throw new Error('Notification not found');
    }

    const users = notification.users.map(user => {
      return user.userId === userId
        ? { ...user, status: NotificationStatusEnum.READ }
        : user
    });

    const data = collection.updateOne({ _id: id }, { users });
    const response: DataResponse<Notification> = { success: true, data };
    return of(response);
  }
}
