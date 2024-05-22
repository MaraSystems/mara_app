import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { environment } from 'src/environments/environment';
import { Database, EngineTypes } from '@black-ink/lonedb';
import { DataResponse } from '../models/data-response';
import { of, throwError } from 'rxjs';
import { IQueryOption } from '@black-ink/lonedb/lib/models/query-option.interface';
import { UploadData } from '../../features/attachment/utils/models/upload-data';
import { Attachment } from '../../features/attachment/utils/models/attatchment.model';
import { DownloadData } from '../../features/attachment/utils/models/download-data';
import { AccessService } from './access.service';
import { TransactionModelEnum } from 'src/app/transaction/utils/models/transaction-model.enum';
import { Transaction } from 'src/app/transaction/utils/models/transaction.model';
import { TransactionActionEnum } from 'src/app/transaction/utils/models/transaction-action.enum';

@Injectable({
  providedIn: 'root'
})
export class DBService {
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
    const document = collection.findOne(query, {}, { sort: { version: 'desc' } } as IQueryOption);
    const { path } = document;
    const url = localStorage.getItem(`${path}`) as string;
    const response: DataResponse<string> = { success: true, data: url as string };
    return of(response);
  }

  public getWallet(userId: string) {
    const collection = this.accessService.db.createCollection<Transaction>('transactions', { timestamp: true });
    const { balance } = collection.findOne({ userId, model: TransactionModelEnum.WALLET }, {}, { sort: { createdAt: 'desc' } }) || { balance: 0.00 };
    const response: DataResponse<number> = { success: true, data: balance };
    return response;
  }

  public updateWallet(transaction: Transaction) {
    let { data: balance } = this.getWallet(transaction.userId);

    balance = TransactionActionEnum.CREDIT
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
}
