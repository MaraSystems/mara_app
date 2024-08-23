import { Injectable } from '@angular/core';
import { AccessService } from 'src/app/general/utils/services/access.service';
import { Collection } from '@black-ink/lonedb';
import { catchError, concatMap, map, merge, mergeMap, of, tap, throwError, toArray } from 'rxjs';
import { Update } from '@ngrx/entity';
import { Revision } from '../models/revision';
import { ProjectDeliverable } from 'src/app/project-deliverable/utils/models/project-deliverable';
import { Attachment } from 'src/app/general/features/attachment/utils/models/attachment';
import { AttachmentType } from 'src/app/general/features/attachment/utils/models/attachment-type';
import { ProjectDeliverableAccessService } from 'src/app/project-deliverable/utils/access/project-deliverable-access.service';
import { AttachmentAccessService } from 'src/app/general/features/attachment/utils/access/attachment-access.service';
import { UploadData } from 'src/app/general/features/attachment/utils/models/upload-data';
import { RevisionStatus } from '../models/revision-status';
import { DataResponse } from 'src/app/general/utils/models/data-response';
import { NotificationAccessService } from 'src/app/notification/utils/access/notification-access.service';
import { NotificationType } from 'src/app/notification/utils/models/notification-type';
import { Notification } from 'src/app/notification/utils/models/notification';
import { NotificationStatusType } from 'src/app/notification/utils/models/notification-status-type';


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
    const { reviewerId, requesterId, ...changes } = data;
    let response: DataResponse<Revision>;

    console.log(data);
    

    return this.accessService.findOne<Revision>(this.domain, { reviewerId, $not: { status: RevisionStatus.REVIEWED }})
      .pipe(
        mergeMap((r) => {
          response = r;
          const { status, _id, requesterId: oldRequester } = response.data;
          const newStatus = requesterId === oldRequester
            ? RevisionStatus.IN_REVIEW
            : status;

          return this.updateRevision({ id: _id, changes: { ...changes, status: newStatus } })
        }),
        catchError((error) => {          
          if (error === 'Not found') {
            return this.accessService.insertOne(this.domain, data)
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

  listRevisions(contractId: string, limit = 10, skip = 0) {
    const response = this.accessService.find<Revision[]>(this.domain, { contractId });
    return response;
  }

  updateRevision(data: Update<Revision>) {    
    const response = this.accessService.updateOne<Revision>(this.domain, { _id: data.id }, data.changes);
    return response;
  }
}
