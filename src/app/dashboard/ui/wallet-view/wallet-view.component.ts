import { Component, OnInit, Input } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Store } from "@ngrx/store";
import { AppState } from "src/app/app.state";
import { PopupService } from "src/app/general/features/popup/popup.service";
import { Toast } from "src/app/general/features/toast/utils/models/toast";
import { BaseComponent } from "src/app/general/utils/services/basecomponent.service";
import { DeleteTransactionAction } from "src/app/transaction/utils/store/transaction-store.action";
import { GetWalletAction } from "../../utils/store/dashboard-store.action";
import { selectDashboardWidgetById } from "../../utils/store/dashboard-store.selector";
import { formatMoney } from "src/app/general/utils/lib/formatMoney";

@Component({
  selector: 'app-wallet-view',
  templateUrl: './wallet-view.component.html',
  styleUrls: ['./wallet-view.component.scss']
})
export class WalletViewComponent extends BaseComponent implements OnInit {
  @Input({ required: true }) userId = '';
  balance = 0;

  constructor(
    public store: Store<AppState>,
    public popupService: PopupService
  ){
    super();
  }

  ngOnInit(): void {
    this.store.dispatch(new GetWalletAction(this.userId)); 
    
    this.newSubscription = this.store.select(selectDashboardWidgetById<number>('wallet-balance')).subscribe(widget => {                  
      this.balance = widget.data
    });
  }
}
