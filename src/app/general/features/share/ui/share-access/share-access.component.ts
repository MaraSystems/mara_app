import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Share } from '../../utils/models/share';
import { SharePrivacyType } from '../../utils/models/share-privacy';
import { ShareAccessType } from '../../utils/models/share-access';
import { FormControl, FormGroup } from '@angular/forms';
import { BaseComponent } from 'src/app/general/utils/services/basecomponent.service';
import { Privacy } from '../../utils/models/privacy';
import { Store } from '@ngrx/store';
import { ShareType } from '../../utils/models/share-type';


@Component({
  selector: 'app-share-access',
  templateUrl: './share-access.component.html',
  styleUrls: ['./share-access.component.scss']
})
export class ShareAccessComponent extends BaseComponent implements OnInit {
  @Input() model!: ShareType;
  @Input() modelId!: string;
  @Input() privacy!: SharePrivacyType;
  @Input() access!: ShareAccessType;

  @Output() changed = new EventEmitter<Privacy>();

  privacyForm!: FormGroup;

  privacyList: SharePrivacyType[] = [
    SharePrivacyType.PUBLIC,
    SharePrivacyType.PRIVATE
  ];

  accessList: ShareAccessType[] = [
    ShareAccessType.VIEW,
    ShareAccessType.ENGAGE
  ];

  get public () {
    return this.privacy === SharePrivacyType.PUBLIC;
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
