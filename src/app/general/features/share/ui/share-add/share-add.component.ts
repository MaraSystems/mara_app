import { Component, ComponentRef, ElementRef, EventEmitter, Input, OnInit, Output, Type } from '@angular/core';
import { ShareEnum } from '../../utils/models/share.enum';
import { SharePrivacyEnum } from '../../utils/models/share.privacy-enum';
import { ShareAccessEnum } from '../../utils/models/share.access-enum';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Share } from '../../utils/models/share.model';
import { UnSubscriber } from 'src/app/general/utils/services/unsubscriber.service';
import { Privacy } from '../../utils/models/privacy';
import { listValidator } from 'src/app/general/utils/validators/listValidator';
import { Store } from '@ngrx/store';
import { CreateShareAction, ListSharesAction } from '../../utils/store/share-store.action';
import { selectSharesByModelId } from '../../utils/store/share-store.selector';
import { ShareStateEnum } from '../../utils/models/share.state-enum';
import { GetClientAction } from 'src/app/client/utils/store/client-store.action';
import { selectClientById } from 'src/app/client/utils/store/client-store.selector';
import { Client } from 'src/app/client/utils/models/client';

@Component({
  selector: 'app-share-add',
  templateUrl: './share-add.component.html',
  styleUrls: ['./share-add.component.scss']
})
export class ShareAddComponent extends UnSubscriber implements OnInit {
  @Input() model!: ShareEnum;
  @Input() modelId!: string;
  @Output() changed = new EventEmitter<Privacy>();

  form!: FormGroup;
  accessList: ShareAccessEnum[] = [
    ShareAccessEnum.VIEW,
    ShareAccessEnum.ENGAGE
  ];

  constructor(
    public store: Store
  ) { 
    super();
  }

  ngOnInit(): void {
    this.initForm();
  }

  getControl(form: FormGroup, name: string) {
    return form.controls[name] as FormControl;
  }

  initForm() {
    this.form = new FormGroup({
      list: new FormControl('', [Validators.required, listValidator({ type: 'email' })]),
      access: new FormControl('', Validators.required)
    });
  }

  addUsers() {
    const list: string[] = Array.from(this.form.get('list')?.value || []);
    const access = this.form.get('access')?.value;    

    list.map(email => {
      const share: any = {
        email,
        model: this.model,
        modelId: this.modelId,
        access,
        state: ShareStateEnum.PENDING
      };

      this.store.dispatch(new CreateShareAction(share));
    });

    this.form.reset();
  }
}
