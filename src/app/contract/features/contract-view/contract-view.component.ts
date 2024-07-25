import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Contract } from '../../utils/models/contract.model';
import { UnSubscriber } from 'src/app/general/utils/services/unsubscriber.service';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.state';
import { selectContractById } from '../../utils/store/contract-store.selector';
import { ActivatedRoute, Router } from '@angular/router';
import { GetContractAction, UpdateContractAction } from '../../utils/store/contract-store.action';
import { More } from 'src/app/general/utils/models/more.model';
import { PopupService } from 'src/app/general/features/popup/features/popup.service';
import { selectAllContractDeliverables } from 'src/app/contract-deliverable/utils/store/contract-deliverable-store.selector';
import { ContractDeliverable } from 'src/app/contract-deliverable/utils/models/contract-deliverable.model';
import { ListContractDeliverablesAction } from 'src/app/contract-deliverable/utils/store/contract-deliverable-store.action';
import { ContractStatus } from '../../utils/models/contract-status.enum';
import { AddToast } from 'src/app/general/features/toast/utils/store/toast.action';
import { selectActiveAuth } from 'src/app/auth/utils/store/auth-store.selector';
import { Auth } from 'src/app/auth/utils/models/auth.model';
import { toggleList } from 'src/app/general/utils/lib/toggleList';
import { CommentEnum } from 'src/app/general/features/comment/utils/models/comment.enum';
import { ListCommentsAction } from 'src/app/general/features/comment/utils/store/comment-store.action';
import { selectCommentsByModelId } from 'src/app/general/features/comment/utils/store/comment-store.selector';
import { ToastEnum } from 'src/app/general/features/toast/utils/models/toast.enum';
import { Toast } from 'src/app/general/features/toast/utils/models/toast.class';
import { ShareEnum } from 'src/app/general/features/share/utils/models/share.enum';
import { Privacy } from 'src/app/general/features/share/utils/models/privacy';
import { ContractRequest } from 'src/app/contract/utils/models/contract.model';
import { CreateContractAction } from 'src/app/contract/utils/store/contract-store.action';
import { summerizeDeliverables } from 'src/app/general/utils/lib/summerizeDeliverables';

@Component({
  selector: 'app-contract-view',
  templateUrl: './contract-view.component.html',
  styleUrls: ['./contract-view.component.scss']
})
export class ContractViewComponent extends UnSubscriber implements OnInit {
  auth!: Auth;
  contract!: Contract;
  deliverables: ContractDeliverable[] = [];
  selectedDeliverables: string[] = [];
  id!: string;
  price!: string;
  duration!: number;

  moreList: More[] = [];

  liked = false;
  bookmarked = false;
  commentModel = CommentEnum.PROJECT;
  shareModel = ShareEnum.PROJECT;
  commentsCount = 0;
  contractStatus = ContractStatus;

  constructor(
    public store: Store<AppState>,
    private activatedRoute: ActivatedRoute,
    public popupService: PopupService,
    private cdr: ChangeDetectorRef,
  ){
    super();
  }

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.paramMap.get('contract_id') as string;   
    this.store.dispatch(new GetContractAction(this.id)); 
    this.store.dispatch(new ListContractDeliverablesAction(this.id));

    this.newSubscription = this.store.select(selectAllContractDeliverables(this.id)).subscribe(deliverables => {
      this.deliverables = deliverables;
      const summary = summerizeDeliverables(this.deliverables);
      this.price = summary.price;
      this.duration = summary.duration;
    });
    
    this.newSubscription = this.store.select(selectContractById(this.id)).subscribe(contract => {
      this.contract = contract;             

      if (this.contract) {
        this.newSubscription = this.store.select(selectActiveAuth).subscribe(auth => {
          this.auth = auth;
        });         
      }    
    });

    this.store.dispatch(new ListCommentsAction(this.commentModel, this.id));

    this.newSubscription = this.store.select(selectCommentsByModelId(this.commentModel, this.id)).subscribe(comments => {
      this.commentsCount = comments.length;
    });
  }

  approveContract() {
    this.store.dispatch(new UpdateContractAction({ id: this.id, changes: { status: ContractStatus.APPROVED }}, {
      success: () => {
        this.store.dispatch(new AddToast({ description: 'Contract Approved Successful' }));
      },
      failure: () => {
        this.store.dispatch(new AddToast({ description: 'Contract Approved Failed' }));
      }
    }));
  }

  initiateContract() {
    this.store.dispatch(new UpdateContractAction({ id: this.id, changes: { status: ContractStatus.INITIATED }}, {
      success: () => {
        this.store.dispatch(new AddToast({ description: 'Contract Initiation Successful' }));
      },
      failure: () => {
        this.store.dispatch(new AddToast({ description: 'Contract Initiation Failed' }));
      }
    }));
  }

  terminateContract() {
    this.store.dispatch(new UpdateContractAction({ id: this.id, changes: { status: ContractStatus.TERMINATED }}, {
      success: () => {
        this.store.dispatch(new AddToast({ description: 'Contract Approved Successful' }));
      },
      failure: () => {
        this.store.dispatch(new AddToast({ description: 'Contract Approved Failed' }));
      }
    }));
  }
}
