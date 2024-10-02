import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Share } from '../../utils/models/share';
import { ShareAccessType } from '../../utils/models/share-access';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UnSubscriber } from 'src/app/general/utils/services/unsubscriber.service';
import { Privacy } from '../../utils/models/privacy';
import { listValidator } from 'src/app/general/utils/validators/listValidator';
import { Store } from '@ngrx/store';
import { CreateShareAction } from '../../utils/store/share-store.action';
import { ShareType } from '../../utils/models/share-type';
import { ShareState } from '../../utils/models/share-state';
@Component({
  selector: 'app-share-add',
  templateUrl: './share-add.component.html',
  styleUrls: ['./share-add.component.scss']
})
export class ShareAddComponent extends UnSubscriber implements OnInit {
  @Input() model!: ShareType;
  @Input() modelId!: string;
  @Output() changed = new EventEmitter<Privacy>();

  form!: FormGroup;
  accessList: ShareAccessType[] = [
    ShareAccessType.VIEW,
    ShareAccessType.ENGAGE
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
      access: new FormControl(ShareAccessType.VIEW, Validators.required)
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
        state: ShareState.PENDING
      };

      this.store.dispatch(new CreateShareAction(share));
    });

    this.form.reset();
  }
}
