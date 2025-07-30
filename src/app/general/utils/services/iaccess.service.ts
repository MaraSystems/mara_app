import { IWaitList } from './../../../home/utils/models/waitlist';
import { IQuery, IQueryOption } from '@black-ink/lonedb';
import { DataResponse } from '../models/data-response';
import { Observable } from 'rxjs';
import { IMessage, ISendMessageParams } from '../../features/bot/utils/models/imessage';

export interface IAccessService {
  joinWaitlist: (data: IWaitList) => Observable<DataResponse<null>>;

  sendMessage: (data: ISendMessageParams) => Observable<DataResponse<string>>;
}
