import { Injectable } from '@angular/core';
import { AccessService } from 'src/app/general/utils/services/access.service';
import { catchError, concat, concatMap, map, merge, mergeMap, of, tap, throwError, toArray } from 'rxjs';
import { Update } from '@ngrx/entity';
import { Revision } from '../models/revision';
import { AttachmentAccessService } from 'src/app/attachment/utils/access/attachment-access.service';
import { DataResponse } from 'src/app/general/utils/models/data-response';
import { NotificationAccessService } from 'src/app/notification/utils/access/notification-access.service';
import { NotificationType } from 'src/app/notification/utils/models/notification-type';
import { Notification } from 'src/app/notification/utils/models/notification';
import { NotificationStatusType } from 'src/app/notification/utils/models/notification-status-type';
import { RevisionType } from '../models/revision-type';
import { RevisionStatus } from '../models/revision-status';
import { AttachmentType } from 'src/app/attachment/utils/models/attachment-type';
import { CommentAccessService } from 'src/app/comment/utils/access/comment-access.service';
import { CommentType } from 'src/app/comment/utils/models/comment-type';
import { Comment } from 'src/app/comment/utils/models/comment';
import { RevisionComment } from '../models/revision-comment';


@Injectable({
  providedIn: 'root'
})
export class RevisionAccessService {
  domain = 'revisions';

  constructor(
    private accessService: AccessService,
    private attachmentService: AttachmentAccessService,
    private notificationService: NotificationAccessService,
    private commentService: CommentAccessService
  ) {}

  createRevision(data: Partial<Revision>) {
    const { userId, model, modelId, status } = data;
    let response: DataResponse<Revision>;    

    return status === RevisionStatus.PENDING
      ? this.accessService.findOne<Revision>(this.domain, { userId, model, modelId, status })
          .pipe(
            mergeMap((r) => this.getRevision(r.data._id)),
            catchError((error) => {          
              if (error === 'Not found') {
                return this.accessService.insertOne(this.domain, { ...data, comments: [] })
              } else {
                return throwError(error);
              }
            }),
          )
      : this.accessService.insertOne(this.domain, data)
          .pipe(
            tap(r => response = r),
            map(() => {
              if(status === RevisionStatus.REQUESTED) {
                this.notificationService.createNotification({ 
                  subject: 'Revision Request',
                  description: `A review request has been sent to you`,
                  model: NotificationType.REVISION,
                  modelId: response.data._id,
                  users: [
                    { status: NotificationStatusType.PENDING, userId: userId },
                  ],
                  hidden: false,
                  links: [{ title: 'Open Revision', url: `http://${location.host}/revisions/${response.data._id}`}]
                } as Notification)
              }
            }),
            mergeMap(() => of(response))
          )
  }

  getRevision(id: string) {    
    const response = this.accessService.findOne<Revision>(this.domain, { _id: id });
    return response;
  }

  listRevisions(model: RevisionType, modelId: string, limit = 10, skip = 0) {
    return this.accessService.find<Revision[]>(this.domain, { model, modelId, '@not': { status: RevisionStatus.PENDING } }, { sort: { createdAt: 'asc' } })
  }

  updateRevision(data: Update<Revision>) {    
    const response = this.accessService.updateOne<Revision>(this.domain, { _id: data.id }, data.changes);
    return response;
  }
}
