import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { environment } from 'src/environments/environment';
import { Database, EngineTypes } from '@black-ink/lonedb';
import { DataResponse } from '../models/data-response';
import { of, throwError } from 'rxjs';
import { DocumentData } from '../models/document-data';
import { IQueryOption } from '@black-ink/lonedb/lib/models/query-option.interface';
import { UploadData } from '../models/upload-data';
import { DownloadData } from '../models/download-data';

@Injectable({
  providedIn: 'root'
})
export class AccessService {
  host = environment.apiUrl;
  db = new Database(`${environment.env}-${environment.appName}`, EngineTypes.LOCALSTORAGE);

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

  public upload(entry: UploadData) {
    const { _id, name, model, modelId, data: url } = entry;
    const collection = this.db.createCollection<DocumentData>('documents');
    const { version: latest } = collection.findOne({ _id }) || { version: -1 };
    const version = latest + 1;
    localStorage.setItem(`${model}/${name}/${version}`, url);

    const document: Partial<DocumentData> = { name, model, modelId, version };
    const data = version 
      ? collection.updateOne({ _id }, document as DocumentData)
      : collection.insertOne(document as DocumentData);
    const response: DataResponse<DocumentData> = { success: true, data };
    return of(response);
  }

  public download(query: DownloadData){
    const collection = this.db.createCollection<DocumentData>('documents');    
    const document = collection.findOne(query, { sort: { version: 'desc' } } as IQueryOption);
    const { model, name, version } = document;
    const url = localStorage.getItem(`${model}/${name}/${version}`) as string;
    const response: DataResponse<string> = { success: true, data: url as string };
    return of(response);
  }

  public insertOne<T>(endpoint: string, entry: Partial<T>) {
    const collection = this.db.createCollection<T>(endpoint);
    const data = collection.insertOne(entry as T);
    const response: DataResponse<T> = { success: true, data };
    return of(response);
  }

  public findOne<T>(endpoint: string, query: any, options?: IQueryOption) {
    const collection = this.db.createCollection<T>(endpoint);
    const data = collection.findOne(query, options);
    if (!data) {
      return throwError(() => 'Not found');
    }    
    const response: DataResponse<T> = { success: true, data: data as T };
    return of(response);
  }

  public find<T>(endpoint: string, query?: any, options?: IQueryOption) {
    const collection = this.db.createCollection<T>(endpoint);    
    const data = collection.find(query, options);    
    const response: DataResponse<T> = { success: true, data: data as T };    
    return of(response);
  }

  public updateOne<T>(endpoint: string, query: any, changes: Partial<T>, options?: IQueryOption) {
    const collection = this.db.createCollection<T>(endpoint);
    const data = collection.updateOne(query, changes, options) as T;
    const response: DataResponse<T> = { success: true, data };
    return of(response);
  }

  public removeOne<T>(endpoint: string, query: any, options?: IQueryOption) {
    const collection = this.db.createCollection<T>(endpoint);
    const data = collection.removeOne(query, options);
    if (!data) {
      return throwError(() => 'Not found');
    }
    const response: DataResponse<T> = { success: true, data: data as T };
    return of(response);
  }
}
