import { Component, OnInit } from '@angular/core';
import { UnSubscriber } from 'src/app/general/utils/services/unsubscriber.service';
import { Store } from '@ngrx/store';
import { ActivatedRoute } from '@angular/router';
import { Revision } from '../../utils/models/revision';
import { ListRevisionsAction } from '../../utils/store/revision-store.action';
// import { selectAllRevisions } from '../../utils/store/revision-store.selector';

@Component({
  selector: 'app-revision-create',
  templateUrl: './revision-create.component.html',
  styleUrls: ['./revision-create.component.scss']
})
export class RevisionCreateComponent extends UnSubscriber implements OnInit{
  deliverables: Revision[] = [];
  id: string = '';
  
  constructor(
    public store: Store,
    public activatedRoute: ActivatedRoute
  ){
    super();
  }

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.paramMap.get('contract_id') as string;    
    this.store.dispatch(new ListRevisionsAction(this.id, { limit: 10, skip: 1 }));

    // this.newSubscription = this.store.select(selectAllRevisions(this.id)).subscribe(deliverables => {      
    //   this.deliverables = deliverables;            
    // });
  }
}
