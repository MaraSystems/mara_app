import { Component, OnInit } from '@angular/core';
import { BaseComponent } from 'src/app/general/utils/services/basecomponent.service';
import { Store } from '@ngrx/store';
import { ActivatedRoute } from '@angular/router';
import { Revision } from '../../utils/models/revision';
import { CreateRevisionAction, ListRevisionsAction } from '../../utils/store/revision-store.action';
import { RevisionType } from '../../utils/models/revision-type';
import { selectAllRevisionsByModelId } from '../../utils/store/revision-store.selector';
import { CommentType } from 'src/app/comment/utils/models/comment-type';
import { RevisionStatus } from '../../utils/models/revision-status';
import { selectActiveAuth } from 'src/app/auth/utils/store/auth-store.selector';
import { Auth } from 'src/app/auth/utils/models/auth.model';

@Component({
  selector: 'app-revision-list',
  templateUrl: './revision-list.component.html',
  styleUrls: ['./revision-list.component.scss']
})
export class RevisionListComponent extends BaseComponent implements OnInit{
  revisions: Revision[] = [];
  model!: RevisionType;
  modelId!: string;
  commentType = CommentType;
  auth!: Auth;
  
  constructor(
    public store: Store,
    public activatedRoute: ActivatedRoute
  ){
    super();
  }

  ngOnInit(): void {
    this.model = this.activatedRoute.snapshot.queryParamMap.get('model') as RevisionType;    
    this.modelId = this.activatedRoute.snapshot.queryParamMap.get('modelId') as string;   

    this.store.dispatch(new ListRevisionsAction(this.model, this.modelId, { limit: 10, skip: 1 }));

    this.newSubscription = this.store.select(selectActiveAuth).subscribe(auth => this.auth = auth);

    this.newSubscription = this.store.select(selectAllRevisionsByModelId(this.model, this.modelId)).subscribe(revisions => {      
      this.revisions = revisions;     
    });
  }

  addComment(commentId: string) {
    this.store.dispatch(new CreateRevisionAction({ 
      userId: this.auth.id,
      status: RevisionStatus.COMMENT,
      model: this.model,
      modelId: this.modelId,
      commentId
    } as Partial<Revision>, {
      success: (response) => {
        
      },
      failure: (error?: string) => {
        // this.store.dispatch(new AddToast({ title: 'Revision request failed', description: error }))
      }
    }));
  }
}
