import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { environment } from 'src/environments/environment';
import { Collection, Database } from '@black-ink/lonedb';
import { DataResponse } from '../models/data-response';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccessService {
  host = environment.apiUrl;
  db = new Database('contractor');

  constructor(
    private httpClient: HttpClient
  ) { }

  public request<T, K>(method: string, endpoint: string, data?: K) {    
    const url = `${this.host}/${endpoint}`;
    return this.httpClient.request<DataResponse<T>>(method.toUpperCase(), url, {
      body: data
    });
  }

  public insert<T>(endpoint: string, entry: any) {
    const collection = this.db.createCollection<T>(endpoint);
    const data = collection.insertOne(entry);
    const response: DataResponse<T> = { success: true, data };
    return response;
  }

  public get<T>(endpoint: string, query: any) {
    const collection = this.db.createCollection<T>(endpoint);
    const data = collection.findOne(query);
    const response: DataResponse<T> = { success: true, data: data as T };
    return response;
  }
}
