import { Injectable } from '@angular/core';
import { AccessService } from 'src/app/general/utils/services/access.service';
import { Update } from '@ngrx/entity';
import { ListOptions } from 'src/app/general/utils/models/list-options';
import { Comment } from '../models/comment.model';
import { map, mergeMap, of, tap } from 'rxjs';
import { DataResponse } from 'src/app/general/utils/models/data-response';
import { APIService } from 'src/app/general/utils/services/api.service';

@Injectable({
  providedIn: 'root'
})
export class CommentAccessService {
  domain = 'comments';

  constructor(
    private accessService: AccessService,
    private apiService: APIService
  ) {}

  createComment(data: Comment) {    
    const { attachment, ...entry } = data;    
    const response = this.accessService.insertOne<Comment>(this.domain, { 
      ...entry, 
      likes: [],
      bookmarks: []
    }).pipe(
      mergeMap(({ data: comment }) => attachment
        ? this.apiService.upload({ 
          model: 'Comment', modelId: comment._id as string, data: attachment, name: ''
        }).pipe(
          tap(({ data: uploaded }) => {
            this.updateComment({ id: comment._id, changes: { attachment: uploaded._id }});
          }),
          map(({ data: uploaded }) => {
            const uploadedComment: DataResponse<Comment> =  { success: true, data: { ...comment, attachment: uploaded._id }};
            return uploadedComment;
          })
        )
        : of({ success: true, data: comment } as DataResponse<Comment>)
      )
    );

    return response;
  }

  getComment(id: string) {    
    const response = this.accessService.findOne<Comment>(this.domain, { _id: id });
    return response;
  }

  listComments(model: string, modelId: string, data?: ListOptions) {
    const response = this.accessService.find<[Comment]>(this.domain, { model, modelId, hidden: false });
    return response;
  }

  updateComment(data: Update<Comment>) {    
    const response = this.accessService.updateOne<Comment>(this.domain, { _id: data.id }, data.changes);
    return response;
  }

  deleteComment(id: string) {    
    const response = this.accessService.removeOne<Comment>(this.domain, { _id: id });
    return response;
  }
}
