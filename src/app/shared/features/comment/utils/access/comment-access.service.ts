import { Injectable } from '@angular/core';
import { AccessService } from 'src/app/shared/utils/services/access.service';
import { Update } from '@ngrx/entity';
import { ListPayload } from 'src/app/shared/utils/models/list-payload';
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
    });
    return response;
  }

  getComment(id: string) {    
    const response = this.accessService.findOne<Comment>(this.domain, { _id: id });
    return response;
  }

  listComments(data: ListPayload) {
    const response = this.accessService.find<[Comment]>(this.domain, { hidden: false });
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
