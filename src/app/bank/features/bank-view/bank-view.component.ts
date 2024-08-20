import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Bank } from '../../utils/models/bank.model';
import { UnSubscriber } from 'src/app/general/utils/services/unsubscriber.service';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.state';
import { selectBankById } from '../../utils/store/bank-store.selector';
import { ActivatedRoute } from '@angular/router';
import { DeleteBankAction, GetBankAction } from '../../utils/store/bank-store.action';
import { More } from 'src/app/general/utils/models/more';
import { PopupService } from 'src/app/general/features/popup/popup.service';
import { selectActiveAuth } from 'src/app/auth/utils/store/auth-store.selector';
import { Auth } from 'src/app/auth/utils/models/auth.model';
import { CommentType } from 'src/app/general/features/comment/utils/models/comment-type';
import { ListCommentsAction } from 'src/app/general/features/comment/utils/store/comment-store.action';
import { selectCommentsByModelId } from 'src/app/general/features/comment/utils/store/comment-store.selector';
import { Toast } from 'src/app/general/features/toast/utils/models/toast';
import { Share } from 'src/app/general/features/share/utils/models/share';
import { ShareType } from 'src/app/general/features/share/utils/models/share-type';

@Component({
  selector: 'app-bank-view',
  templateUrl: './bank-view.component.html',
  styleUrls: ['./bank-view.component.scss']
})
export class BankViewComponent extends UnSubscriber implements OnInit {
  auth!: Auth;
  bank!: Bank;
  id!: string;
  price!: string;
  duration!: number;

  moreList: More[] = [];

  liked = false;
  bookmarked = false;
  commentModel = CommentType.PROJECT;
  shareModel = ShareType.PROJECT;
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
    this.id = this.activatedRoute.snapshot.paramMap.get('bank_id') as string;   
    this.store.dispatch(new GetBankAction(this.id)); 
    
    this.newSubscription = this.store.select(selectBankById(this.id)).subscribe(bank => {
      this.bank = bank;  
    });

    this.newSubscription = this.store.select(selectActiveAuth).subscribe(auth => {      
      this.moreList = auth.id === this.bank.userId
        ? this.moreList = [
          { name: 'Update', icon: 'update', popup: `bank-update-${this.id}` },
          { name: 'Delete', icon: 'Delete', action: () => { this.deleteBank() } }
        ]
        : [];
    });

    this.store.dispatch(new ListCommentsAction(this.commentModel, this.id));

    this.newSubscription = this.store.select(selectCommentsByModelId(this.commentModel, this.id)).subscribe(comments => {
      this.commentsCount = comments.length;
    });
  }

  deleteBank() {
    Toast.warn(this.store, 'Click continue to delete bank', ['Continue'], () => {
      this.store.dispatch(new DeleteBankAction(this.id));
    });
  }
}
