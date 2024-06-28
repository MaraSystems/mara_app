import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { UnSubscriber } from 'src/app/general/utils/services/unsubscriber.service';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.state';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { getFormControl } from 'src/app/general/utils/lib/getFormControl';
import { PopupService } from 'src/app/general/features/popup/features/popup.service';


@Component({
  selector: 'app-profile-create-compliance-item',
  templateUrl: './profile-create-compliance-item.component.html',
  styleUrls: ['./profile-create-compliance-item.component.scss']
})
export class ProfileCreateComplianceItemComponent extends UnSubscriber implements OnInit {
  @Input() data: { title: string, expiry: boolean }[] = [];
  @Input() name = '';

  @Output() changes = new EventEmitter<FormGroup>();

  form!: FormGroup;
  getControl = getFormControl;
  list: string[] = [];
  expiry = false;

  constructor (
    public store: Store<AppState>,
    public popupService: PopupService
  ) {
    super();
  }

  setExpiry (modelType: string) {    
    const item = this.data.find(d => d.title === modelType);    
    this.expiry = !!item?.expiry;

    const expiryControl = getFormControl(this.form, 'expiry');
    const expiryDate = this.expiry ? null : new Date();
    expiryControl.setValue(expiryDate);
  }

  ngOnInit(): void {    
    this.initForm();
    this.list = this.data.map(d => d.title);
  }

  initForm() {
    this.form = new FormGroup({
      modelType: new FormControl(null, [Validators.minLength(12), Validators.required]),
      document: new FormControl(null, [Validators.required]),
      expiry: new FormControl(null, [Validators.required])
    });

    this.newSubscription = this.form.valueChanges.subscribe(data => {                          
      this.changes.emit(this.form);    
    });

    const modelControl = getFormControl(this.form, 'modelType');
    modelControl.valueChanges.subscribe(value => this.setExpiry(value));
  }
}
