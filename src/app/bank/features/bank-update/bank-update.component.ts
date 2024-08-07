import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Bank } from '../../utils/models/bank.model';
import { UnSubscriber } from 'src/app/general/utils/services/unsubscriber.service';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.state';
import { CreateBankAction, DeleteBankAction, UpdateBankAction } from '../../utils/store/bank-store.action';
import { selectActiveAuth } from 'src/app/auth/utils/store/auth-store.selector';
import { SharePrivacyEnum } from 'src/app/general/features/share/utils/models/share.privacy-enum';
import { ShareAccessEnum } from 'src/app/general/features/share/utils/models/share.access-enum';
import { Privacy } from 'src/app/general/features/share/utils/models/privacy';
import { AddToast } from 'src/app/general/features/toast/utils/store/toast.action';
import { Router } from '@angular/router';
import { PopupService } from 'src/app/general/features/popup/features/popup.service';
import { accountNumberPattern } from 'src/app/general/utils/lib/patterns';
import { Toast } from 'src/app/general/features/toast/utils/models/toast.class';
import { selectBankById } from '../../utils/store/bank-store.selector';


@Component({
  selector: 'app-bank-update',
  templateUrl: './bank-update.component.html',
  styleUrls: ['./bank-update.component.scss']
})
export class BankUpdateComponent extends UnSubscriber implements OnInit {
  @Input() id = '';
  bank!: Bank;
  form!: FormGroup;
  updateData!: Partial<Bank>;

  constructor(
    public store: Store<AppState>,
    public popupService: PopupService
  ){
    super();
  }
  
  ngOnInit(): void {
    this.newSubscription = this.store.select(selectBankById(this.id)).subscribe(bank => {
      this.bank = bank;
      if (this.bank) {
        this.initForm();
        this.newSubscription = this.form.valueChanges.subscribe(data => {                
          this.updateData = data;   
        });
      }
    });
  }

  initForm() {
    console.log(this.bank);
    
    this.form = new FormGroup({
      bankName: new FormControl(this.bank.bankName, [Validators.minLength(3), Validators.required]),
      accountNumber: new FormControl(this.bank.accountNumber, [Validators.pattern(accountNumberPattern), Validators.required]),
      accountName: new FormControl(this.bank.accountName, [Validators.minLength(3), Validators.required]),
      default: new FormControl(this.bank.default),
    });
  }

  isValid(name: string) {
    const { invalid, touched } = this.form.controls[name];
    return invalid && touched;
  }

  getControl(name: string) {
    const control = this.form.get(name) as FormControl;    
    return control;
  }

  updateBank() {        
    this.store.dispatch(new UpdateBankAction({ id: this.id, changes: this.updateData }, {
      success: () => {        
        this.store.dispatch(new AddToast({ title: 'Bank update successful' }));
        this.popupService.close('bank-update');
      },
      failure: () => {
        this.store.dispatch(new AddToast({ title: 'Bank update failed' }));
      }
    }));
  }

  deleteBank() {
    Toast.warn(this.store, 'Click continue to delete bank', ['Continue'], () => {
      this.store.dispatch(new DeleteBankAction(this.id));
      this.popupService.close('bank-update');
    });
  }
}
