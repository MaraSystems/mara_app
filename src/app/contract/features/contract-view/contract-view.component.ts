import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Contract } from '../../utils/models/contract';
import { UnSubscriber } from 'src/app/general/utils/services/unsubscriber.service';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.state';
import { selectContractById } from '../../utils/store/contract-store.selector';
import { ActivatedRoute, Router } from '@angular/router';
import { GetContractAction, UpdateContractAction } from '../../utils/store/contract-store.action';
import { More } from 'src/app/general/utils/models/more';
import { PopupService } from 'src/app/general/features/popup/popup.service';
import { selectAllContractDeliverables } from 'src/app/contract-deliverable/utils/store/contract-deliverable-store.selector';
import { ContractDeliverable } from 'src/app/contract-deliverable/utils/models/contract-deliverable';
import { ListContractDeliverablesAction } from 'src/app/contract-deliverable/utils/store/contract-deliverable-store.action';
import { ContractStatus } from '../../utils/models/contract-status';
import { AddToast } from 'src/app/general/features/toast/utils/store/toast.action';
import { selectActiveAuth } from 'src/app/auth/utils/store/auth-store.selector';
import { Auth } from 'src/app/auth/utils/models/auth.model';
import { CommentType } from 'src/app/comment/utils/models/comment-type';
import { ListCommentsAction } from 'src/app/comment/utils/store/comment-store.action';
import { selectCommentsByModelId } from 'src/app/comment/utils/store/comment-store.selector';
import { Share } from 'src/app/general/features/share/utils/models/share';
import { summerizeDeliverables } from 'src/app/general/utils/lib/summerizeDeliverables';
import { ToastType } from 'src/app/general/features/toast/utils/models/toast-type';
import { GetWalletAction } from 'src/app/dashboard/utils/store/dashboard-store.action';
import { GetComplianceAction } from 'src/app/profile/features/compliance/utils/store/compliance-store.action';
import { GetClientAction } from 'src/app/client/utils/store/client-store.action';
import { selectClientById } from 'src/app/client/utils/store/client-store.selector';
import { Client } from 'src/app/client/utils/models/client';
import { GetAttachmentAction } from 'src/app/attachment/utils/store/attachment-store.action';
import { ComplianceTitleEnum } from 'src/app/client/utils/models/compliance';
import { selectAttachmentById } from 'src/app/attachment/utils/store/attachment-store.selector';
import { ShareType } from 'src/app/general/features/share/utils/models/share-type';
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
  commentModel = CommentType.PROJECT;
  shareModel = ShareType.PROJECT;
  commentsCount = 0;
  contractStatus = ContractStatus;
  walletBalance = 0;
  contractor!: Client;
  contractClient!: Client;
  contractorSignature = '';
  clientSignature = '';

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
    this.store.dispatch(new ListCommentsAction(this.commentModel, this.id));

    this.newSubscription = this.store.select(selectActiveAuth).subscribe(auth => {
      this.auth = auth;
    });    

    this.newSubscription = this.store.select(selectAllContractDeliverables(this.id)).subscribe(deliverables => {
      this.deliverables = deliverables;
      const summary = summerizeDeliverables(this.deliverables);
      this.price = summary.price;
      this.duration = summary.duration;
    });
    
    this.newSubscription = this.store.select(selectContractById(this.id)).subscribe(contract => {
      this.contract = contract; 
      this.getContractUsers();   
    });

    this.newSubscription = this.store.select(selectCommentsByModelId(this.commentModel, this.id)).subscribe(comments => {
      this.commentsCount = comments.length;
    });
  }

  approveContract() {
    this.store.dispatch(new UpdateContractAction({ id: this.id, changes: { status: ContractStatus.APPROVED }}, {
      success: () => {
        this.store.dispatch(new AddToast({ title: 'Contract Approval Successful' }));
      },
      failure: (error) => {
        this.store.dispatch(new AddToast({ title: 'Contract Approval Failed', description: error, type: ToastType.ERROR }));
      }
    }));
  }

  initiateContract() {
    this.store.dispatch(new UpdateContractAction({ id: this.id, changes: { status: ContractStatus.INITIATED }}, {
      success: () => {
        this.store.dispatch(new GetWalletAction(this.auth.id));
        this.store.dispatch(new AddToast({ title: 'Contract Initiation Successful' }));
      },
      failure: (error) => {        
        this.store.dispatch(new AddToast({ title: 'Contract Initiation Failed', description: error, type: ToastType.ERROR }));
      }
    }));
  }

  terminateContract() {
    this.store.dispatch(new UpdateContractAction({ id: this.id, changes: { status: ContractStatus.TERMINATED }}, {
      success: () => {
        this.store.dispatch(new AddToast({ title: 'Contract Termination Successful' }));
      },
      failure: () => {
        this.store.dispatch(new AddToast({ title: 'Contract Termination Failed' }));
      }
    }));
  }

  getContractUsers() {
    const { clientId, contractorId } = this.contract;

    this.store.dispatch(new GetClientAction(contractorId));
    this.newSubscription = this.store.select(selectClientById(contractorId)).subscribe(contractor => {
      this.contractor = contractor;            
    });

    this.store.dispatch(new GetAttachmentAction(this.contract.contractorSignature?.attachment));      
    this.newSubscription = this.store.select(selectAttachmentById(this.contract.contractorSignature?.attachment)).subscribe(a => {        
      this.contractorSignature = a?.versions[a?.versions.length - 1].url as string;
    });

    this.store.dispatch(new GetClientAction(clientId));
    this.newSubscription = this.store.select(selectClientById(clientId)).subscribe(contractClient => {
      this.contractClient = contractClient;      
    });

    this.store.dispatch(new GetAttachmentAction(this.contract.clientSignature?.attachment));      
    this.newSubscription = this.store.select(selectAttachmentById(this.contract.clientSignature?.attachment)).subscribe(a => {        
      this.clientSignature = a?.versions[a?.versions.length - 1].url as string;
    });
  }
}
