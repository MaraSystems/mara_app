import { Component, OnInit } from '@angular/core';
import { UnSubscriber } from 'src/app/general/utils/services/unsubscriber.service';
import { Store } from '@ngrx/store';
import { ActivatedRoute } from '@angular/router';
import { Revision } from '../../utils/models/revision';
import { ListRevisionsAction } from '../../utils/store/revision-store.action';
import { RevisionType } from '../../utils/models/revision.type';
import { selectAllRevisionsByModelId } from '../../utils/store/revision-store.selector';
// import { selectAllRevisions } from '../../utils/store/revision-store.selector';

@Component({
  selector: 'app-revision-list',
  templateUrl: './revision-list.component.html',
  styleUrls: ['./revision-list.component.scss']
})
export class RevisionListComponent extends UnSubscriber implements OnInit{
  revisions: Revision[] = [];
  model!: RevisionType;
  modelId!: string;
  
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

    this.newSubscription = this.store.select(selectAllRevisionsByModelId(this.model, this.modelId)).subscribe(revisions => {      
      this.revisions = revisions;                
    });
  }
}
