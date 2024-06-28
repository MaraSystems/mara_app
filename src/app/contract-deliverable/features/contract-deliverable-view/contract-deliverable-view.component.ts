import { Component, OnInit } from '@angular/core';
import { UnSubscriber } from 'src/app/general/utils/services/unsubscriber.service';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.state';
import { ActivatedRoute } from '@angular/router';
import { More } from 'src/app/general/utils/models/more.model';
import { PopupService } from 'src/app/general/features/popup/features/popup.service';
import { ContractDeliverable } from '../../utils/models/contract-deliverable.model';
import { GetContractDeliverableAction, UpdateContractDeliverableAction } from '../../utils/store/contract-deliverable-store.action';
import { selectContractDeliverableById } from '../../utils/store/contract-deliverable-store.selector';
import { Attachment } from 'src/app/general/features/attachment/utils/models/attatchment.model';
import { ListAttachmentsAction } from 'src/app/general/features/attachment/utils/store/attatchment-store.action';
import { toggleList } from 'src/app/general/utils/lib/toggleList';
import { selectActiveAuth } from 'src/app/auth/utils/store/auth-store.selector';
import { Auth } from 'src/app/auth/utils/models/auth.model';
import { selectCommentsByModelId } from 'src/app/general/features/comment/utils/store/comment-store.selector';
import { ListCommentsAction } from 'src/app/general/features/comment/utils/store/comment-store.action';
import { CommentEnum } from 'src/app/general/features/comment/utils/models/comment.enum';
import { GetContractAction } from 'src/app/contract/utils/store/contract-store.action';
import { selectContractById } from 'src/app/contract/utils/store/contract-store.selector';
import { Toast } from 'src/app/general/features/toast/utils/models/toast.class';
import { Privacy } from 'src/app/general/features/share/utils/models/privacy';
import { AttachmentModelEnum } from 'src/app/general/features/attachment/utils/models/attatchment-model.enum';

@Component({
  selector: 'app-contract-deliverable-view',
  templateUrl: './contract-deliverable-view.component.html',
  styleUrls: ['./contract-deliverable-view.component.scss']
})
export class ContractDeliverableViewComponent extends UnSubscriber implements OnInit {
  auth!: Auth;
  deliverable = new ContractDeliverable();
  attachment: Attachment[] = [];
  id!: string;
  liked = false;
  bookmarked = false;
  moreList: More[] = [];
  commentModel = CommentEnum.CONTRACT;
  commentsCount = 0;
  attatmentModel = AttachmentModelEnum;

  constructor(
    public store: Store<AppState>,
    private activatedRoute: ActivatedRoute,
    public popupService: PopupService
  ){
    super();
  }

  ngOnInit(): void {    
    this.id = this.activatedRoute.snapshot.paramMap.get('deliverable_id') as string;   
    this.store.dispatch(new GetContractDeliverableAction(this.id)); 
    this.store.dispatch(new ListAttachmentsAction('contract-document', this.id));
    
    this.newSubscription = this.store.select(selectContractDeliverableById(this.id)).subscribe(deliverable => {
      this.deliverable = deliverable;        
      if (this.deliverable) {
        this.store.dispatch(new GetContractAction(deliverable.contractId));

        this.newSubscription = this.store.select(selectActiveAuth).subscribe(auth => {
          this.auth = auth;
          this.newSubscription = this.store.select(selectContractById(deliverable.contractId)).subscribe(contract => {
            // this.moreList = auth.id === contract.userId
            // ? this.moreList = [
            //   { name: 'Update', icon: 'update', popup: `contract-deliverable-update-${this.id}` },
            // ]
            // : [];
          });
        }); 
      }
    });

    
    this.store.dispatch(new ListCommentsAction(this.commentModel, this.id));

    this.newSubscription = this.store.select(selectCommentsByModelId(this.commentModel, this.id)).subscribe(comments => {
      this.commentsCount = comments.length;
    });
  }
}
