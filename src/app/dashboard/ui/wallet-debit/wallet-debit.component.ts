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
import { selectAllClientBanks, selectClientDefaultBank } from "src/app/bank/utils/store/bank-store.selector";
import { Bank } from "src/app/bank/utils/models/bank.model";
import { KeyValue } from "@angular/common";
import { ListBanksAction } from "src/app/bank/utils/store/bank-store.action";
import { AddToast } from "src/app/general/features/toast/utils/store/toast.action";
import { WalletTransaction } from "../../utils/models/wallet-transaction.model";

@Component({
  selector: 'app-wallet-debit',
  templateUrl: './wallet-debit.component.html',
  styleUrls: ['./wallet-debit.component.scss']
})
export class WalletDebitComponent extends UnSubscriber implements OnInit {
  @Input({ required: true }) userId = '';
  @Input({ required: true }) balance = 0;
  form!: FormGroup;
  transaction!: WalletTransaction;
  getControl = getFormControl;
  banks: KeyValue<string, string>[] = [];
  defaultBank!: Bank;

  constructor(
    public store: Store<AppState>,
    public popupService: PopupService
  ){
    super();
  }

  ngOnInit(): void {
    this.store.dispatch(new ListBanksAction({}));
    this.newSubscription = this.store.select(selectAllClientBanks(this.userId)).subscribe(banks => {      
      this.banks = banks.map(bank => {        
        if (bank.default) {
          this.defaultBank = bank;
        }

        return { key: bank._id, value: `${bank.accountNumber} (${bank.bankName})`}
      });

      this.initForm();
    });
  }

  initForm() {    
    this.form = new FormGroup({
      amount: new FormControl(null, [Validators.required, Validators.min(1000)]),
      modelId: new FormControl(this.defaultBank?._id, [Validators.required, Validators.min(1000)]),
      action: new FormControl(TransactionActionEnum.DEBIT),
      userId: new FormControl(this.userId),
    });

    this.newSubscription = this.form.valueChanges.subscribe(data => {
      this.transaction = { ...(this.transaction || {}), ...data }
    });
  }

  withdraw() {    
    this.store.dispatch(new UpdateWalletAction(this.transaction, {
      success: () => {
        this.store.dispatch(new AddToast({ title: 'Wallet debit successful'}))
      },
      failure: () => {
        this.store.dispatch(new AddToast({ title: 'Wallet debit failed'}))
      }
    }))
  }
}
