import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Revision } from '../../utils/models/revision';
import { BaseComponent } from 'src/app/general/utils/services/basecomponent.service';
import { Store } from '@ngrx/store';
import { GetClientAction } from 'src/app/client/utils/store/client-store.action';
import { Client } from 'src/app/client/utils/models/client';
import { selectClientById } from 'src/app/client/utils/store/client-store.selector';
import { GetCommentAction } from 'src/app/comment/utils/store/comment-store.action';
import { RevisionStatus } from '../../utils/models/revision-status';
import { More } from 'src/app/general/utils/models/more';


@Component({
  selector: 'app-revision-item',
  templateUrl: './revision-item.component.html',
  styleUrls: ['./revision-item.component.scss']
})
export class RevisionItemComponent extends BaseComponent implements OnInit {
  @Input({ required: true }) revision!: Revision;
  @Output() commented = new EventEmitter<string>();

  client!: Client;
  reviewer!: Client;
  revisionStatus = RevisionStatus;
  moreList: More[] = [];

  get statusIcon() {
    switch (this.revision.status) {
      case RevisionStatus.REQUESTED:
        return 'prompt_suggestion';
      case RevisionStatus.COMMENT:
        return 'comment';
      case RevisionStatus.AMEND:
        return 'edit';
      case RevisionStatus.APPROVE:
        return 'check';
      default:
        return '';
    }
  }

  get statusMessage() {
    switch (this.revision.status) {
      case RevisionStatus.REQUESTED:
        return 'requested review from ' + this.reviewer.username;
      case RevisionStatus.COMMENT:
        return 'commented';
      case RevisionStatus.AMEND:
        return 'requested changes';
      case RevisionStatus.APPROVE:
        return 'approved';
      default:
        return '';
    }
  }

  constructor(
    private store: Store
  ){
    super();
  }

  ngOnInit(): void {    
    this.store.dispatch(new GetClientAction(this.revision.userId));
    if (this.revision.reviewerId) {
      this.store.dispatch(new GetClientAction(this.revision.reviewerId));
    }

    this.newSubscription = this.store.select(selectClientById(this.revision.userId)).subscribe(client => {
      this.client = client;
    });

    this.newSubscription = this.store.select(selectClientById(this.revision.reviewerId)).subscribe(reviewer => {
      this.reviewer = reviewer;
    });

    this.setOptions();    
  }

  setOptions() {    
    
  }
}
