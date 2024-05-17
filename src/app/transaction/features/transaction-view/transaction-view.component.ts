import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Transaction } from '../../utils/models/transaction.model';
import { UnSubscriber } from 'src/app/general/utils/services/unsubscriber.service';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.state';
import { selectTransactionById } from '../../utils/store/transaction-store.selector';
import { ActivatedRoute } from '@angular/router';
import { DeleteTransactionAction, GetTransactionAction, UpdateTransactionAction } from '../../utils/store/transaction-store.action';
import { More } from 'src/app/general/utils/models/more.model';
import { PopupService } from 'src/app/general/features/popup/features/popup.service';
import { TransactionStatusEnum } from '../../utils/models/transaction-status.enum';
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
import { Share } from 'src/app/general/features/share/utils/models/share.model';
import { Privacy } from 'src/app/general/features/share/utils/models/privacy';

@Component({
  selector: 'app-transaction-view',
  templateUrl: './transaction-view.component.html',
  styleUrls: ['./transaction-view.component.scss']
})
export class TransactionViewComponent extends UnSubscriber implements OnInit {
  auth!: Auth;
  transaction!: Transaction;
  id!: string;
  price!: string;
  duration!: number;

  moreList: More[] = [];

  liked = false;
  bookmarked = false;
  commentModel = CommentEnum.PROJECT;
  shareModel = ShareEnum.PROJECT;
  commentsCount = 0;

  constructor(
    public store: Store<AppState>,
    private activatedRoute: ActivatedRoute,
    public popupService: PopupService,
    private cdr: ChangeDetectorRef
  ){
    super();
  }

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.paramMap.get('transaction_id') as string;   
    this.store.dispatch(new GetTransactionAction(this.id)); 
    
    this.newSubscription = this.store.select(selectTransactionById(this.id)).subscribe(transaction => {
      this.transaction = transaction;  
    });

    this.newSubscription = this.store.select(selectActiveAuth).subscribe(auth => {      
      this.moreList = auth.id === this.transaction.userId
        ? this.moreList = [
          { name: 'Update', icon: 'update', popup: `transaction-update-${this.id}` },
          { name: 'Delete', icon: 'Delete', action: () => { this.deleteTransaction() } }
        ]
        : [];
    });

    this.store.dispatch(new ListCommentsAction(this.commentModel, this.id));

    this.newSubscription = this.store.select(selectCommentsByModelId(this.commentModel, this.id)).subscribe(comments => {
      this.commentsCount = comments.length;
    });
  }

  deleteTransaction() {
    Toast.warn(this.store, 'Click continue to delete transaction', ['Continue'], () => {
      this.store.dispatch(new DeleteTransactionAction(this.id));
    });
  }
}
