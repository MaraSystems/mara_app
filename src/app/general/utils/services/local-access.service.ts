import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Database, EngineTypes, IQuery, IQueryOption } from '@black-ink/lonedb';
import { DataResponse } from '../models/data-response';
import { catchError, map, mergeMap, Observable, of, tap, throwError } from 'rxjs';
import { IAccessService } from './iaccess.service';
import { IWaitList } from 'src/app/home/utils/models/waitlist';
import { IMessage } from '../../features/bot/utils/models/imessage';
import { MessengerEnum } from '../../features/bot/utils/models/messager.enum';

@Injectable({
  providedIn: 'root'
})
export class LocalAccessService implements IAccessService {

  db = new Database(`${environment.env}-${environment.appName}`, EngineTypes.LOCALSTORAGE);

  private insertOne<T>(endpoint: string, entry: Partial<T>) {
    delete (entry as any)._id;
    const collection = this.db.createCollection<T>(endpoint, { timestamp: true });
    const data = collection.insertOne(entry as T);
    const response: DataResponse<T> = { success: true, data };
    return of(response);
  }

  private findOne<T>(endpoint: string, query: IQuery<T>, options?: IQueryOption) {
    const collection = this.db.createCollection<T>(endpoint, { timestamp: true });
    const data = collection.findOne(query, options);
    if (!data) {
      return throwError('Not found');
    }
    const response: DataResponse<T> = { success: true, data: data as T };
    return of(response);
  }

  private find<T>(endpoint: string, query?: any, options?: IQueryOption) {
    const collection = this.db.createCollection<T>(endpoint, { timestamp: true });
    const data = collection.find(query, { sort: { createdAt: 'asc' }, ...options });
    const response: DataResponse<T[]> = { success: true, data };
    return of(response);
  }

  private updateOne<T>(endpoint: string, query: any, changes: Partial<T>) {
    const collection = this.db.createCollection<T>(endpoint, { timestamp: true });
    const data = collection.updateOne(query, changes) as T;
    const response: DataResponse<T> = { success: true, data };
    return of(response);
  }

  private removeOne<T>(endpoint: string, query: any) {
    const collection = this.db.createCollection<T>(endpoint, { timestamp: true });
    const data = collection.removeOne(query);
    if (!data) {
      return throwError(() => 'Not found');
    }
    const response: DataResponse<T> = { success: true, data: data as T };
    return of(response);
  }

  private remove<T>(endpoint: string, query?: any) {
    const collection = this.db.createCollection<T>(endpoint, { timestamp: true });
    const data = collection.remove(query);
    const response: DataResponse<T[]> = { success: true, data };
    return of(response);
  }

  joinWaitlist(entry: IWaitList) {
    const response: DataResponse<null> = { success: true, message: 'You have joined the waitlist', data: null };
    return of(response);
  }

  sendMessage(message: string){
    return this.insertOne<IMessage>('messages', { content: message, type: MessengerEnum.HUMAN }).pipe(
      mergeMap(() => this.insertOne<IMessage>('messages', { content: 'Bot reply', type: MessengerEnum.ROBOT }))
    )
  };
}
