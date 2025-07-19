import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { environment } from 'src/environments/environment';
import { IQuery, IQueryOption } from '@black-ink/lonedb';
import { DataResponse } from '../models/data-response';
import { IAccessService } from './iaccess.service';
import { User } from 'src/app/users/utils/models/user';
import { Kin } from 'src/app/users/utils/models/kin';
import { Update } from '@ngrx/entity';
import { Attachment } from 'src/app/attachment/utils/models/attachment';
import { AttachmentType } from 'src/app/attachment/utils/models/attachment-type';
import { UploadData } from 'src/app/attachment/utils/models/upload-data';
import { Compliance, ComplianceTitleEnum } from 'src/app/users/utils/models/compliance';
import { Share } from '../../features/share/utils/models/share';
import { AuthAccessService } from 'src/app/auth/utils/access/auth-access.service';

@Injectable({
  providedIn: 'root'
})
export class ApiAccessService implements IAccessService {
    host = environment.apiUrl;

  constructor(
    private httpClient: HttpClient,
    private authService: AuthAccessService
  ) {}

  request<T>({ method, endpoint, body, params, query }: {
    method: string,
    endpoint: string,
    body?: Record<string, any>,
    params?: Record<string, any>,
    query?: Record<string, any>
  }) {
    const url = `${this.host}/${endpoint}`;
    const token = this.authService.auth?.token || '';
    return this.httpClient.request<DataResponse<T>>(method.toUpperCase(), url, {
      body,
      params,
      headers: {
        'Content-Type': 'application/json',
        'authorization': `Bearer ${token}`
      }
    });
  }

  createUser(entry: Partial<User>) {
    return this.request<User>({ method: 'post', endpoint: 'users', body: entry });
  }

  requestPassword(email: string) {
    return this.request<string>({ method: 'get', endpoint: `auth/${email}` });
  }

  login(entry: { email: string, password: string }) {
    return this.request<{ id: string, token: string }>({ method: 'post', endpoint: 'auth', body: entry });
  }

  getProfile() {
    return this.request<User>({ method: 'get', endpoint: 'profile' });
  }

  getUser(id: string) {
    return this.request<User>({ method: 'get', endpoint: `users/${id}` });
  }

  listUsers(query?: any, options?: IQueryOption) {
    return this.request<User[]>({ method: 'get', endpoint: 'users', query });
  }

  updateProfile(changes: Partial<User>) {
    return this.request<User>({ method: 'patch', endpoint: 'profile', body: changes });
  }

  createKin(entry: Partial<Kin>) {
    return this.request<Kin>({ method: 'post', endpoint: 'kins', body: entry });
  }

  getKin(query: IQuery<Kin>) {
    return this.request<Kin>({ method: 'get', endpoint: 'kins', query });
  }

  updateKin(query: any, changes: Partial<Kin>) {
    return this.request<Kin>({ method: 'patch', endpoint: 'kins', body: changes, query });
  }

  createCompliance(data: Compliance, document: string) {
    return this.request<Compliance>({ method: 'post', endpoint: 'compliances', body: data });
  }

  getCompliance(id: string) {
    return this.request<Compliance>({ method: 'get', endpoint: 'compliances', query: { _id: id } });
  }

  listCompliance(userId: string) {
    return this.request<Compliance[]>({ method: 'get', endpoint: 'compliances', query: { userId } });
  }

  updateCompliance(id: string, changes: Partial<Compliance>) {
    return this.request<Compliance>({ method: 'patch', endpoint: 'compliances', body: changes, query: { _id: id } });
  }

  uploadComplianceDocument(data: Compliance, document: string) {
    return this.request<Compliance>({ method: 'post', endpoint: 'compliances/upload', body: { data, document } });
  }

  checkCompliance(userId: string, title: ComplianceTitleEnum) {
    return this.request<Compliance>({ method: 'get', endpoint: 'compliances', query: { userId, title } })
  }

  uploadAttachment(uploadData: UploadData) {
    return this.request<Attachment>({ method: 'post', endpoint: 'attachments', body: uploadData });
  }

  getAttachment(id: string) {
    return this.request<Attachment>({ method: 'get', endpoint: `attachments/${id}` });
  }

  listAttachments(model: AttachmentType, modelId: string, limit = 10, skip = 0) {
    return this.request<Attachment[]>({ method: 'get', endpoint: 'attachments', query: { model, modelId, limit, skip } });
  }

  updateAttachment(data: Update<Attachment>) {
    return this.request<Attachment>({ method: 'patch', endpoint: `attachments/${data.id}`, body: data.changes });
  }

  deleteAttachment(id: string) {
    return this.request<Attachment>({ method: 'delete', endpoint: `attachments/${id}` });
  }

  createShare(data: Share) {
    return this.request<Share>({ method: 'post', endpoint: 'shares', body: data });
  }

  getShare(id: string) {
    return this.request<Share>({ method: 'get', endpoint: `shares/${id}` });
  }

  listShares(model: string, modelId: string, data?: IQueryOption) {
    return this.request<Share[]>({ method: 'get', endpoint: 'shares', query: { model, modelId, hidden: false, ...data } });
  }

  updateShare(data: Update<Share>) {
    return this.request<Share>({ method: 'patch', endpoint: `shares/${data.id}`, body: data.changes });
  }

  deleteShare(id: string) {
    return this.request<Share>({ method: 'delete', endpoint: `shares/${id}` });
  }
}
