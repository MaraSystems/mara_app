import { Injectable } from '@angular/core';
import { AccessService } from 'src/app/general/utils/services/access.service';
import { Update } from '@ngrx/entity';
import { ListPayload } from 'src/app/general/utils/models/list-payload';
import { Comment } from '../models/comment.model';

@Injectable({
  providedIn: 'root'
})
export class CommentAccessService {
  domain = 'comments';

  constructor(
    private accessService: AccessService
  ) {}

  createComment(data: Comment) {    
    const response = this.accessService.insertOne<Comment>(this.domain, { 
      ...data, 
      likes: [],
      attachments: []
    });
    return response;
  }

  getComment(id: string) {    
    const response = this.accessService.findOne<Comment>(this.domain, { _id: id });
    return response;
  }

  listComments(model: string, modelId: string, data?: ListPayload) {
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
