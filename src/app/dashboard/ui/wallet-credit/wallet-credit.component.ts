import { Component, OnInit, Input } from "@angular/core";
import { Store } from "@ngrx/store";
import { AppState } from "src/app/app.state";
import { PopupService } from "src/app/general/features/popup/popup.service";
import { BaseComponent } from "src/app/general/utils/services/basecomponent.service";
import { UpdateWalletAction } from "../../utils/store/dashboard-store.action";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { TransactionPlatform } from "src/app/transaction/utils/models/transaction-platform";
import { TransactionType } from "src/app/transaction/utils/models/transaction-type";
import { Transaction } from "src/app/transaction/utils/models/transaction";
import { getFormControl } from "src/app/general/utils/lib/getFormControl";
import { TransactionAction } from "src/app/transaction/utils/models/transaction-action";
import { AddToast } from "src/app/general/features/toast/utils/store/toast.action";

@Component({
  selector: 'app-wallet-credit',
  templateUrl: './wallet-credit.component.html',
  styleUrls: ['./wallet-credit.component.scss']
})
export class WalletCreditComponent extends BaseComponent implements OnInit {
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
      action: new FormControl(TransactionAction.CREDIT),
      userId: new FormControl(this.userId),
    });

    this.newSubscription = this.form.valueChanges.subscribe(data => {
      this.transaction = { ...(this.transaction || {}), ...data }
    });
  }

  deposit() {    
    this.store.dispatch(new UpdateWalletAction(this.transaction, {
      success: () => {
        this.store.dispatch(new AddToast({ title: 'Wallet credit successful'}))
      },
      failure: () => {
        this.store.dispatch(new AddToast({ title: 'Wallet credit failed'}))
      }
    }))
  }
}
