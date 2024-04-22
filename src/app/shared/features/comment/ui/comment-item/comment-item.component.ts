import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Client } from 'src/app/client/utils/models/client';
import { selectAuthClient } from 'src/app/client/utils/store/client-store.selector';
import { UnSubscriber } from 'src/app/shared/utils/services/unsubscriber.service';
import { Comment } from '../../utils/models/comment.model';

@Component({
  selector: 'app-comment-item',
  templateUrl: './comment-item.component.html',
  styleUrls: ['./comment-item.component.scss']
})
export class CommentItemComponent extends UnSubscriber implements OnInit {
  @Input() comment!: Comment;

  client!: Client;
  liked = false;

  constructor(
    public store: Store
  ){
    super();
  }

  ngOnInit(): void {
    this.newSubscription = this.store.select(selectAuthClient).subscribe(client => {
      this.client = client;
      this.liked = this.comment.likes.includes(this.client._id);
    });
  }

  likeToggle(){
    // const likes = toggleList([...this.project.likes], this.auth.id);    
    // this.store.dispatch(new UpdateProjectAction({ id: this.id, changes: { likes } }, { loud: false }));
  }
}
