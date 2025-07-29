import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { environment } from 'src/environments/environment';
import { IQuery, IQueryOption } from '@black-ink/lonedb';
import { DataResponse } from '../models/data-response';
import { IAccessService } from './iaccess.service';
import { IWaitList } from 'src/app/home/utils/models/waitlist';
import { Observable } from 'rxjs';
import { IMessage } from '../../features/bot/utils/models/imessage';

@Injectable({
  providedIn: 'root'
})
export class ApiAccessService implements IAccessService {
    host = environment.apiUrl;

  constructor(
    private httpClient: HttpClient,
  ) {}

  request<T>({ method, endpoint, body, params, query }: {
    method: string,
    endpoint: string,
    body?: Record<string, any>,
    params?: Record<string, any>,
    query?: Record<string, any>
  }) {
    const url = `${this.host}/${endpoint}`;
    return this.httpClient.request<DataResponse<T>>(method.toUpperCase(), url, {
      body,
      params,
      headers: {
        'Content-Type': 'application/json',
        // 'authorization': `Bearer ${token}`
      }
    });
  }

  joinWaitlist(entry: IWaitList) {
    return this.request<null>({ method: 'post', endpoint: 'users', body: entry });
  }

  sendMessage(message: string){
    return this.request<IMessage>({ method: 'post', endpoint: 'messages', body: { content: message } });
  }
}
