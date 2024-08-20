import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Bank } from '../../utils/models/bank.model';
import { UnSubscriber } from 'src/app/general/utils/services/unsubscriber.service';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.state';
import { CreateBankAction } from '../../utils/store/bank-store.action';
import { selectActiveAuth } from 'src/app/auth/utils/store/auth-store.selector';
import { SharePrivacyType } from 'src/app/general/features/share/utils/models/share-privacy-type';
import { ShareAccessType } from 'src/app/general/features/share/utils/models/share-access-type';
import { Privacy } from 'src/app/general/features/share/utils/models/privacy';
import { AddToast } from 'src/app/general/features/toast/utils/store/toast.action';
import { Router } from '@angular/router';
import { PopupService } from 'src/app/general/features/popup/popup.service';
import { accountNumberPattern } from 'src/app/general/utils/lib/patterns';


@Component({
  selector: 'app-bank-create',
  templateUrl: './bank-create.component.html',
  styleUrls: ['./bank-create.component.scss']
})
export class BankCreateComponent extends UnSubscriber implements OnInit {
  bank!: Bank;
  form!: FormGroup;

  constructor(
    public store: Store<AppState>,
    public popupService: PopupService
  ){
    super();
  }
  
  ngOnInit(): void {
    this.initForm();

    this.newSubscription = this.form.valueChanges.subscribe(data => {      
      this.bank = data;      
    });

    this.newSubscription = this.store.select(selectActiveAuth).subscribe(auth => {      
      this.form.get('userId')?.setValue(auth.id);
    });
  }

  initForm() {
    this.form = new FormGroup({
      bankName: new FormControl(null, [Validators.minLength(3), Validators.required]),
      accountNumber: new FormControl(null, [Validators.pattern(accountNumberPattern), Validators.required]),
      accountName: new FormControl(null, [Validators.minLength(3), Validators.required]),
      userId: new FormControl(null),
      default: new FormControl(false),
      hidden: new FormControl(false)
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

  addBank() {        
    this.store.dispatch(new CreateBankAction(this.bank, {
      success: () => {        
        this.store.dispatch(new AddToast({ title: 'Bank creation successful' }));
        this.popupService.close('bank-create');
      },
      failure: () => {
        this.store.dispatch(new AddToast({ title: 'Bank creation failed' }));
      }
    }));
  }
}
