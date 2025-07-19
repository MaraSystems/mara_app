import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Database, EngineTypes, IQuery, IQueryOption } from '@black-ink/lonedb';
import { DataResponse } from '../models/data-response';
import { catchError, map, mergeMap, Observable, of, tap, throwError } from 'rxjs';
import { IAccessService } from './iaccess.service';
import { User } from 'src/app/users/utils/models/user';
import { Kin } from 'src/app/users/utils/models/kin';
import { Compliance, ComplianceTitleEnum } from 'src/app/users/utils/models/compliance';
import { Update } from '@ngrx/entity';
import { Attachment } from 'src/app/attachment/utils/models/attachment';
import { AttachmentType } from 'src/app/attachment/utils/models/attachment-type';
import { AttachmentVersion } from 'src/app/attachment/utils/models/attachment-version';
import { UploadData } from 'src/app/attachment/utils/models/upload-data';
import { Share } from '../../features/share/utils/models/share';
import { AuthAccessService } from 'src/app/auth/utils/access/auth-access.service';

@Injectable({
  providedIn: 'root'
})
export class LocalAccessService extends AuthAccessService implements IAccessService {

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

  createUser(entry: Partial<User>) {
    return this.insertOne<User>('users', entry);
  }

  requestPassword(email: string): Observable<DataResponse<string>> {
    const response: DataResponse<string> = { success: true, data: '12345' };
    return of(response);
  }

  login(auth: { email: string; password: string }) {
    return this.findOne<User>('users', { email: auth.email }).pipe(
      map(({ data: user, success }) => {
        const response: DataResponse<{ id: string; token: string }> = { success, data: { id: user._id, token: 'This is token' }};
        return response;
      })
    );
  }

  getProfile() {
    return this.findOne<User>('users', { _id: this.auth.id });
  }

  getUser(id: string) {
    return this.findOne<User>('users', { _id: id });
  }

  listUsers(query?: IQuery<User>, options?: IQueryOption) {
    return this.find<User>('users', query, options);
  }

  updateProfile(changes: Partial<User>) {
    return this.updateOne<User>('users', { _id: this.auth.id }, changes);
  }

  createKin(data: Partial<Kin>) {
    return this.insertOne<Kin>('kins', data);
  }

  getKin(userId: string) {
    return this.findOne<Kin>('kins', { userId });
  }

  updateKin(id: string, changes: Partial<Kin>) {
    return this.updateOne<Kin>('kins', { _id: id }, changes);
  }

  createCompliance(data: Compliance, document: string) {
    return data._id
      ? this.uploadComplianceDocument(data, document)
      : this.insertOne<Compliance>('compliances', data)
        .pipe(
          mergeMap(({ data: compliance }) => this.uploadComplianceDocument(compliance, document))
        )
  }

  getCompliance(id: string) {
    return this.findOne<Compliance>('compliances', { _id: id });
  }

  listCompliance(userId: string) {
    return this.find<Compliance>('compliances', { userId });
  }

  updateCompliance(id: string, changes: Partial<Compliance>) {
    return this.updateOne<Compliance>('compliances', { _id: id }, changes);
  }

  uploadComplianceDocument(data: Compliance, document: string) {
    return this.uploadAttachment({
      data: document, model: AttachmentType.COMPLIANCE, modelId: data._id, name: '', _id: data.attachment
    }).pipe(
      tap(({ data: uploaded }) => this.updateCompliance(data._id, { attachment: uploaded._id })),
      map(({ data: uploaded }) => {
        const uploadedCompliance: DataResponse<Compliance> =  { success: true, data: { ...data, attachment: uploaded._id }};
        return uploadedCompliance;
      })
    )
  }

  checkCompliance(userId: string, title: ComplianceTitleEnum) {
    return this.findOne<Compliance>('compliances', { userId, title })
      .pipe(
        catchError(error => throwError(`Please upload your ${title}`))
      )
  }

  private addAttachmentVersion(uploadData: UploadData, versions: AttachmentVersion[] = []) {
    const latest = versions.length;
    const latestVersion = versions[latest - 1];
    const { data, ...attachment } = uploadData;
    const { name, model, modelId } = attachment;

    const url = data ? data : localStorage.getItem(`${latestVersion?.path}`) as string
    const path = `${model}/${modelId}/${ name ? `${name}/` : ''}${latest}`;
    localStorage.setItem(path, url);

    versions = versions.map(v => {
      delete v.url;
      return v;
    });

    versions.push({ _v: latest, path, date: new Date(), previews: [] });
    return { ...attachment, versions } as Partial<Attachment>;
  }

  uploadAttachment(uploadData: UploadData) {
    const { _id } = uploadData;
    return this.findOne<Attachment>('attachments', { _id })
      .pipe(
        map(({ data: attachment }) => {
          const { versions } = attachment;
          return this.addAttachmentVersion({ ...uploadData}, versions);
        }),
        mergeMap((attachmentData) => this.updateOne('attachments', { _id }, attachmentData)),
        catchError((error) => {
          if (error === 'Not found') {
            const newAttachment = this.addAttachmentVersion(uploadData);
            return this.insertOne('attachments', newAttachment);
          } else {
            return throwError(error);
          }
        }),
        mergeMap(({ data }) => {
          return this.getAttachment(data._id);
        })
      )
  }

  getAttachment(id: string) {
    return this.findOne<Attachment>('attachments', { _id: id })
      .pipe(
        map(response => {
          response.data.versions = response.data.versions.map(version => {
            version.url = localStorage.getItem(`${version.path}`) as string
            return version;
          });
          return response;
        })
      );
  }

  listAttachments(model: AttachmentType, modelId: string, limit = 10, skip = 0) {
    return this.find<Attachment>('attachments', { model, modelId })
      .pipe(
        map(response => {
          response.data = response.data.map(attachment => {
            attachment.versions = attachment.versions.map(version => {
              version.url = localStorage.getItem(`${version.path}`) as string
              return version;
            })
            return attachment;
          });

          return response;
        })
      );
  }

  updateAttachment(data: Update<Attachment>) {
    return this.updateOne<Attachment>('attachments', { _id: data.id }, data.changes);
  }

  deleteAttachment(id: string) {
    return this.removeOne<Attachment>('attachments', { _id: id });
  }

  createShare(data: Share) {
    return this.insertOne<Share>('shares', data);
  }

  getShare(id: string) {
    return this.findOne<Share>('shares', { _id: id });
  }

  listShares(model: string, modelId: string, data?: IQueryOption) {
    return this.find<Share>('shares', { model, modelId, hidden: false });
  }

  updateShare(data: Update<Share>) {
    return this.updateOne<Share>('shares', { _id: data.id }, data.changes);
  }

  deleteShare(id: string) {
    return this.removeOne<Share>('shares', { _id: id });
  }
}
