import { Component, OnInit } from '@angular/core';
import { UnSubscriber } from 'src/app/general/utils/services/unsubscriber.service';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.state';
import { ActivatedRoute, Router } from '@angular/router';
import { More } from 'src/app/general/utils/models/more';
import { PopupService } from 'src/app/general/features/popup/popup.service';
import { ContractDeliverable } from '../../utils/models/contract-deliverable';
import { GetContractDeliverableAction, UpdateContractDeliverableAction } from '../../utils/store/contract-deliverable-store.action';
import { selectContractDeliverableById } from '../../utils/store/contract-deliverable-store.selector';
import { selectActiveAuth } from 'src/app/auth/utils/store/auth-store.selector';
import { Auth } from 'src/app/auth/utils/models/auth.model';
import { selectCommentsByModelId } from 'src/app/comment/utils/store/comment-store.selector';
import { ListCommentsAction } from 'src/app/comment/utils/store/comment-store.action';
import { CommentType } from 'src/app/comment/utils/models/comment-type';
import { GetContractAction } from 'src/app/contract/utils/store/contract-store.action';
import { selectContractById } from 'src/app/contract/utils/store/contract-store.selector';
import { AttachmentType } from 'src/app/attachment/utils/models/attachment-type';
import { Contract } from 'src/app/contract/utils/models/contract';
import { ContractStatus } from 'src/app/contract/utils/models/contract-status';
import { ContractDeliverableStatus } from '../../utils/models/contract-deliverable-status';
import { selectAttachmentsByModelId } from 'src/app/attachment/utils/store/attachment-store.selector';
import { AddToast } from 'src/app/general/features/toast/utils/store/toast.action';
import { CreateRevisionAction } from 'src/app/revision/utils/store/revision-store.action';
import { Revision } from 'src/app/revision/utils/models/revision';
import { RevisionType } from 'src/app/revision/utils/models/revision-type';
import { RevisionStatus } from 'src/app/revision/utils/models/revision-status';

@Component({
  selector: 'app-contract-deliverable-view',
  templateUrl: './contract-deliverable-view.component.html',
  styleUrls: ['./contract-deliverable-view.component.scss']
})
export class ContractDeliverableViewComponent extends UnSubscriber implements OnInit {
  auth!: Auth;
  deliverable = new ContractDeliverable();
  contract!: Contract;
  id!: string;
  liked = false;
  bookmarked = false;
  moreList: More[] = [
    { name: 'Request Review', icon: 'outgoing_mail', action: () => { this.requestReview() }, hidden: true },
    { name: 'Enable Reviews', icon: 'toggle_on', action: () => { this.enableReviews() }, hidden: true },
    { name: 'Disable Reviews', icon: 'toggle_off', action: () => { this.disableReviews() }, hidden: true },
    { name: 'Start Review', icon: 'rate_review', action: () => { this.startReview() }, hidden: true },
    { name: 'Conversations', icon: 'rate_review', action: () => { this.conversations() } }
  ];
  commentModel = CommentType.CONTRACT;
  commentsCount = 0;
  attatmentModel = AttachmentType;
  contractStatus = ContractStatus;
  contractInitiated = false;
  reviewable = false;
  isContractor = false;
  hasChanges = false;

  constructor(
    public store: Store<AppState>,
    private activatedRoute: ActivatedRoute,
    public popupService: PopupService,
    private router: Router
  ){
    super();
  }

  ngOnInit(): void {    
    this.id = this.activatedRoute.snapshot.paramMap.get('deliverable_id') as string;   
    this.store.dispatch(new GetContractDeliverableAction(this.id)); 
    
    this.newSubscription = this.store.select(selectContractDeliverableById(this.id)).subscribe(deliverable => {
      this.deliverable = deliverable;              
      if (this.deliverable) {
        this.store.dispatch(new GetContractAction(deliverable.contractId));
        this.reviewable = deliverable.status === ContractDeliverableStatus.PROCESSING;

        this.newSubscription = this.store.select(selectActiveAuth).subscribe(auth => {
          this.auth = auth;
          this.newSubscription = this.store.select(selectContractById(deliverable.contractId)).subscribe(contract => {
            this.contract = contract;
            this.contractInitiated = contract.status === ContractStatus.INITIATED;
            this.isContractor = contract.contractorId === auth.id;

            const requestReviewOptionIndex = this.moreList.findIndex(item => item.name === 'Request Review');
            this.moreList[requestReviewOptionIndex].hidden = !(this.reviewable && this.isContractor && this.contractInitiated);   

            this.newSubscription = this.store.select(selectAttachmentsByModelId(AttachmentType.CONTRACT_DELIVERABLE, this.id)).subscribe(attachmentList => {
              this.hasChanges = attachmentList.some(attachment => attachment.versions.length > 1);       

              const enableReviewsOptionIndex = this.moreList.findIndex(item => item.name === 'Enable Reviews');
              this.moreList[enableReviewsOptionIndex].hidden = !(this.hasChanges && this.isContractor && !this.reviewable);   

              const disableReviewsOptionIndex = this.moreList.findIndex(item => item.name === 'Disable Reviews');
              this.moreList[disableReviewsOptionIndex].hidden = !(this.hasChanges && this.isContractor && this.reviewable);   

              const startReviewOptionIndex = this.moreList.findIndex(item => item.name === 'Start Review');
              this.moreList[startReviewOptionIndex].hidden = !(this.hasChanges && this.reviewable);   
            });
          });
        }); 
      }
    });
    
    this.store.dispatch(new ListCommentsAction(this.commentModel, this.id));
    this.newSubscription = this.store.select(selectCommentsByModelId(this.commentModel, this.id)).subscribe(comments => {
      this.commentsCount = comments.length;
    });
  }

  requestReview() {    
    this.store.dispatch(new CreateRevisionAction({ 
      userId: this.contract.clientId,
      reviewerId: this.auth.id,
      status: RevisionStatus.REQUESTED,
      model: RevisionType.CONTRACT_DELIVERABLE,
      modelId: this.deliverable._id
    } as Partial<Revision>, {
      success: () => this.store.dispatch(new AddToast({ title: 'Revision request successful'})),
      failure: (error?: string) => this.store.dispatch(new AddToast({ title: 'Revision request failed', description: error }))
    }));
  }

  startReview() {
    this.store.dispatch(new CreateRevisionAction({ 
      userId: this.contract.clientId,
      status: RevisionStatus.PENDING,
      model: RevisionType.CONTRACT_DELIVERABLE,
      modelId: this.deliverable._id
    } as Partial<Revision>, {
      success: (response) => {
        this.router.navigateByUrl(`revisions/${response?.data._id}/review`);
      },
      failure: (error?: string) => this.store.dispatch(new AddToast({ title: 'Revision request failed', description: error }))
    }));
  }

  enableReviews() {    
    this.store.dispatch(new UpdateContractDeliverableAction({ id: this.id, changes: { status: ContractDeliverableStatus.PROCESSING }}, this.contract._id, {
      success: () => {
        this.store.dispatch(new AddToast({ title: 'Enable contract deliverable review successful'}));
      },
      failure: (error?: string) => {
        this.store.dispatch(new AddToast({ title: 'Enable contract deliverable review failed', description: error }));
      }
    }))
  }

  disableReviews() {    
    this.store.dispatch(new UpdateContractDeliverableAction({ id: this.id, changes: { status: ContractDeliverableStatus.DRAFT }}, this.contract._id, {
      success: () => {
        this.store.dispatch(new AddToast({ title: 'Disable contract deliverable review successful'}));
      },
      failure: (error?: string) => {
        this.store.dispatch(new AddToast({ title: 'Disable contract deliverable review failed', description: error }));
      }
    }))
  }

  conversations() {
    this.router.navigateByUrl(`revisions?model=${RevisionType.CONTRACT_DELIVERABLE}&modelId=${this.deliverable._id}`);
  }

  addComment(commentId: string) {
    this.store.dispatch(new CreateRevisionAction({ 
      userId: this.contract.clientId,
      status: RevisionStatus.COMMENT,
      model: RevisionType.CONTRACT_DELIVERABLE,
      modelId: this.deliverable._id,
      commentId
    } as Partial<Revision>));
  }
}
