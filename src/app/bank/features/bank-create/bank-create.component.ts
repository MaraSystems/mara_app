import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Bank } from '../../utils/models/bank.model';
import { UnSubscriber } from 'src/app/general/utils/services/unsubscriber.service';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.state';
import { CreateBankAction } from '../../utils/store/bank-store.action';
import { selectActiveAuth } from 'src/app/auth/utils/store/auth-store.selector';
import { SharePrivacyEnum } from 'src/app/general/features/share/utils/models/share.privacy-enum';
import { ShareAccessEnum } from 'src/app/general/features/share/utils/models/share.access-enum';
import { Privacy } from 'src/app/general/features/share/utils/models/privacy';
import { AddToast } from 'src/app/general/features/toast/utils/store/toast.action';
import { Router } from '@angular/router';


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
    public router: Router
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
      title: new FormControl(null, [Validators.minLength(3), Validators.required]),
      category: new FormControl(null, [Validators.required]),
      tags: new FormControl(null, [Validators.required]),
      description: new FormControl(null, [Validators.maxLength(10000)]),
      userId: new FormControl(null),
      privacy: new FormControl({ type: SharePrivacyEnum.PUBLIC, access: ShareAccessEnum.ENGAGE } as Privacy),
      hidden: new FormControl(false),
      likes: new FormControl([]),
      bookmarks: new FormControl([]),
      shares: new FormControl(0)
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

  createBank() {    
    this.store.dispatch(new CreateBankAction(this.bank, {
      success: () => {        
        this.store.dispatch(new AddToast({ description: 'Bank creation successful' }));
        this.router.navigateByUrl('/banks');
      },
      failure: () => {
        this.store.dispatch(new AddToast({ description: 'Bank creation failed' }));
      }
    }));
  }
}
