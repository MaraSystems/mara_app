import { User } from './../../../users/utils/models/user';
import { IQuery, IQueryOption } from '@black-ink/lonedb';
import { DataResponse } from '../models/data-response';
import { Observable } from 'rxjs';
import { Kin } from 'src/app/users/utils/models/kin';
import { Compliance, ComplianceTitleEnum } from 'src/app/users/utils/models/compliance';
import { Attachment } from 'src/app/attachment/utils/models/attachment';
import { UploadData } from 'src/app/attachment/utils/models/upload-data';
import { Update } from '@ngrx/entity';
import { AttachmentType } from 'src/app/attachment/utils/models/attachment-type';
import { Share } from '../../features/share/utils/models/share';

export interface IAccessService {
  requestPassword: (email: string) => Observable<DataResponse<string>>;

  login: (auth: { email: string; password: string }) => Observable<DataResponse<{ id: string; token: string }>>;

  createUser: (entry: Partial<User>) => Observable<DataResponse<User>>;

  getProfile: () => Observable<DataResponse<User>>;

  getUser: (id: string) => Observable<DataResponse<User>>;

  listUsers: (query?: any, options?: IQueryOption) => Observable<DataResponse<User[]>>;

  updateProfile: (changes: Partial<User>) => Observable<DataResponse<User>>;

  createKin: (data: Partial<Kin>) => Observable<DataResponse<Kin>>;

  getKin: (userId: string) => Observable<DataResponse<Kin>>;

  updateKin: (id: string, changes: Partial<Kin>) => Observable<DataResponse<Kin>>;

  createCompliance: (data: Compliance, document: string) => Observable<DataResponse<Compliance>>;

  getCompliance: (id: string) => Observable<DataResponse<Compliance>>;

  listCompliance: (userId: string) => Observable<DataResponse<Compliance[]>>;

  updateCompliance: (id: string, changes: Partial<Compliance>) => Observable<DataResponse<Compliance>>;

  uploadComplianceDocument: (data: Compliance, document: string) => Observable<DataResponse<Compliance>>;

  checkCompliance: (userId: string, title: ComplianceTitleEnum) => Observable<DataResponse<Compliance>>;

  uploadAttachment: (uploadData: UploadData) => Observable<DataResponse<Attachment>>;

  getAttachment: (id: string) => Observable<DataResponse<Attachment>>;

  listAttachments: (model: AttachmentType, modelId: string, limit?: number, skip?: number) => Observable<DataResponse<Attachment[]>>;

  updateAttachment: (data: Update<Attachment>) => Observable<DataResponse<Attachment>>;

  deleteAttachment: (id: string) => Observable<DataResponse<Attachment>>;

  createShare: (data: Share) => Observable<DataResponse<Share>>;

  getShare: (id: string) => Observable<DataResponse<Share>>;

  listShares: (model: string, modelId: string, data?: IQueryOption) => Observable<DataResponse<Share[]>>;

  updateShare: (data: Update<Share>) => Observable<DataResponse<Share>>;

  deleteShare: (id: string) => Observable<DataResponse<Share>>;
}
