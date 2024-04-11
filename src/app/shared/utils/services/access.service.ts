import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { environment } from 'src/environments/environment';
import { Database } from '@black-ink/lonedb';
import { DataResponse } from '../models/data-response';
import { of, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccessService {
  host = environment.apiUrl;
  db = new Database(`${environment.env}-${environment.appName}`);

  constructor(
    private httpClient: HttpClient
  ) { 
    (window as any).db = Database;
  }

  public request<T, K>(method: string, endpoint: string, data?: K) {    
    const url = `${this.host}/${endpoint}`;
    return this.httpClient.request<DataResponse<T>>(method.toUpperCase(), url, {
      body: data
    });
  }

  public insert<T>(endpoint: string, entry: Partial<T>) {
    const collection = this.db.createCollection<T>(endpoint);
    const data = collection.insertOne(entry as T);
    const response: DataResponse<T> = { success: true, data };
    return of(response);
  }

  public get<T>(endpoint: string, query: any) {
    const collection = this.db.createCollection<T>(endpoint);
    const data = collection.findOne(query);
    if (!data) {
      return throwError(() => 'Not found');
    }    
    const response: DataResponse<T> = { success: true, data: data as T };
    return of(response);
  }

  public list<T>(endpoint: string, query: any) {
    const collection = this.db.createCollection<T>(endpoint);    
    const data = collection.find(query);
    
    const response: DataResponse<T> = { success: true, data: data as T };
    return of(response);
  }

  public update<T>(endpoint: string, query: any, changes: Partial<T>) {
    const collection = this.db.createCollection<T>(endpoint);
    const data = collection.updateOne(query, changes) as T;
    const response: DataResponse<T> = { success: true, data };
    return of(response);
  }

  public remove<T>(endpoint: string, query: any) {
    const collection = this.db.createCollection<T>(endpoint);
    const data = collection.removeOne(query);
    if (!data) {
      return throwError(() => 'Not found');
    }
    const response: DataResponse<T> = { success: true, data: data as T };
    return of(response);
  }
}
