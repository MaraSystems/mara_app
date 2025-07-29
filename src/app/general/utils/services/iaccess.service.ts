import { IWaitList } from './../../../home/utils/models/waitlist';
import { IQuery, IQueryOption } from '@black-ink/lonedb';
import { DataResponse } from '../models/data-response';
import { Observable } from 'rxjs';
import { IMessage } from '../../features/bot/utils/models/imessage';

export interface IAccessService {
  joinWaitlist: (data: IWaitList) => Observable<DataResponse<null>>;

  sendMessage: (message: string) => Observable<DataResponse<IMessage>>;
}
