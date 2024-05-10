import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ShareEnum } from '../../utils/models/share.enum';
import { SharePrivacyEnum } from '../../utils/models/share.privacy-enum';
import { ShareAccessEnum } from '../../utils/models/share.access-enum';
import { FormControl, FormGroup } from '@angular/forms';
import { UnSubscriber } from 'src/app/general/utils/services/unsubscriber.service';
import { Privacy } from '../../utils/models/privacy';
import { Store } from '@ngrx/store';


@Component({
  selector: 'app-share-access',
  templateUrl: './share-access.component.html',
  styleUrls: ['./share-access.component.scss']
})
export class ShareAccessComponent extends UnSubscriber implements OnInit {
  @Input() model!: ShareEnum;
  @Input() modelId!: string;
  @Input() privacy!: SharePrivacyEnum;
  @Input() access!: ShareAccessEnum;

  @Output() changed = new EventEmitter<Privacy>();

  privacyForm!: FormGroup;

  privacyList: SharePrivacyEnum[] = [
    SharePrivacyEnum.PUBLIC,
    SharePrivacyEnum.PRIVATE
  ];

  accessList: ShareAccessEnum[] = [
    ShareAccessEnum.VIEW,
    ShareAccessEnum.ENGAGE
  ];

  get public () {
    return this.privacy === SharePrivacyEnum.PUBLIC;
  }

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
    this.privacyForm = new FormGroup({
      type: new FormControl(this.privacy),
      access: new FormControl(this.access)
    });

    this.newSubscription = this.privacyForm.valueChanges.subscribe(data => {
      this.changed.emit(data)
    });
  }
}
