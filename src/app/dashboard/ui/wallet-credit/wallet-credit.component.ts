import { Component, OnInit, Input } from "@angular/core";
import { Store } from "@ngrx/store";
import { AppState } from "src/app/app.state";
import { PopupService } from "src/app/general/features/popup/features/popup.service";
import { UnSubscriber } from "src/app/general/utils/services/unsubscriber.service";
import { UpdateWalletAction } from "../../utils/store/dashboard-store.action";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { TransactionPlatformEnum } from "src/app/transaction/utils/models/transaction-platform.enum";
import { TransactionModelEnum } from "src/app/transaction/utils/models/transaction-model.enum";
import { Transaction } from "src/app/transaction/utils/models/transaction.model";
import { getFormControl } from "src/app/general/utils/lib/getFormControl";
import { TransactionActionEnum } from "src/app/transaction/utils/models/transaction-action.enum";
import { AddToast } from "src/app/general/features/toast/utils/store/toast.action";

@Component({
  selector: 'app-wallet-credit',
  templateUrl: './wallet-credit.component.html',
  styleUrls: ['./wallet-credit.component.scss']
})
export class WalletCreditComponent extends UnSubscriber implements OnInit {
  @Input({ required: true }) userId = '';
  @Input({ required: true }) balance = 0;
  form!: FormGroup;
  transaction!: Transaction;
  getControl = getFormControl;

  constructor(
    public store: Store<AppState>,
    public popupService: PopupService
  ){
    super();
  }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.form = new FormGroup({
      amount: new FormControl(null, [Validators.required, Validators.min(1000)]),
      platform: new FormControl(TransactionPlatformEnum.CONTRACTOR),
      model: new FormControl(TransactionModelEnum.WALLET),
      title: new FormControl('Wallet Deposit'),
      hidden: new FormControl(false),
      action: new FormControl(TransactionActionEnum.CREDIT),
      userId: new FormControl(this.userId),
    });

    this.newSubscription = this.form.valueChanges.subscribe(data => {
      this.transaction = { ...(this.transaction || {}), ...data }
    });
  }

  deposit() {    
    this.store.dispatch(new UpdateWalletAction(this.transaction, {
      success: () => {
        this.store.dispatch(new AddToast({ description: 'Wallet credit successful'}))
      },
      failure: () => {
        this.store.dispatch(new AddToast({ description: 'Wallet credit failed'}))
      }
    }))
  }
}
