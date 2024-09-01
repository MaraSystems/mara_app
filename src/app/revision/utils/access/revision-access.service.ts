import { Injectable } from '@angular/core';
import { AccessService } from 'src/app/general/utils/services/access.service';
import { catchError, mergeMap, tap, throwError } from 'rxjs';
import { Update } from '@ngrx/entity';
import { Revision } from '../models/revision';
import { AttachmentAccessService } from 'src/app/attachment/utils/access/attachment-access.service';
import { DataResponse } from 'src/app/general/utils/models/data-response';
import { NotificationAccessService } from 'src/app/notification/utils/access/notification-access.service';
import { NotificationType } from 'src/app/notification/utils/models/notification-type';
import { Notification } from 'src/app/notification/utils/models/notification';
import { NotificationStatusType } from 'src/app/notification/utils/models/notification-status-type';
import { RevisionType } from '../models/revision.type';
import { RevisionDecision } from '../models/revision-decision';


@Injectable({
  providedIn: 'root'
})
export class RevisionAccessService {
  domain = 'revisions';

  constructor(
    private accessService: AccessService,
    private attachmentService: AttachmentAccessService,
    private notificationService: NotificationAccessService
  ) {}

  createRevision(data: Partial<Revision>) {
    const { reviewerId, requesterId, model, modelId, ...changes } = data;
    let response: DataResponse<Revision>;    

    return this.accessService.findOne<Revision>(this.domain, { reviewerId, model, modelId, decision: RevisionDecision.PENDING })
      .pipe(
        mergeMap((r) => {
          console.log(r);
          
          response = r;
          const { _id, requesterId: oldRequester } = response.data;
          return this.updateRevision({ id: _id, changes })
        }),
        catchError((error) => {          
          if (error === 'Not found') {
            return this.accessService.insertOne(this.domain, { ...data, decision: RevisionDecision.PENDING, comments: [] })
              .pipe(
                tap((r) => {
                  response = r;
                  if (reviewerId !== requesterId) {
                    this.notificationService.createNotification({ 
                      subject: 'Revision Request',
                      description: `A review request has been sent to you`,
                      model: NotificationType.REVISION,
                      modelId: response.data._id,
                      users: [
                        { status: NotificationStatusType.PENDING, userId: reviewerId },
                      ],
                      hidden: false,
                      links: [{ title: 'Open Revision', url: `http://${location.host}/revisions/${response.data._id}`}]
                     } as Notification)
                  }
                }),
              )
          } else {
            return throwError(error);
          }
        }),
      )
  }

  getRevision(id: string) {    
    const response = this.accessService.findOne<Revision>(this.domain, { _id: id });
    return response;
  }

  listRevisions(model: RevisionType, modelId: string, limit = 10, skip = 0) {
    const response = this.accessService.find<Revision[]>(this.domain, { model, modelId });
    return response;
  }

  updateRevision(data: Update<Revision>) {    
    const response = this.accessService.updateOne<Revision>(this.domain, { _id: data.id }, data.changes);
    return response;
  }
}
