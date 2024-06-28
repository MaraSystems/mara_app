import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UnSubscriber } from 'src/app/general/utils/services/unsubscriber.service';
import { AppState } from 'src/app/app.state';
import { Store } from '@ngrx/store';
import { UploadAttachmentAction } from 'src/app/general/features/attachment/utils/store/attatchment-store.action';
import { fileValidator } from 'src/app/general/utils/validators/fileValidator';
import { Attachment } from '../../utils/models/attatchment.model';
import { UploadData } from '../../utils/models/upload-data';
import { AddToast } from '../../../toast/utils/store/toast.action';
import { PopupService } from '../../../popup/features/popup.service';
import { AttachmentModelEnum } from '../../utils/models/attatchment-model.enum';

@Component({
  selector: 'app-attachment-upload',
  templateUrl: './attachment-upload.component.html',
  styleUrls: ['./attachment-upload.component.scss']
})
export class AttachmentUploadComponent extends UnSubscriber implements OnInit {
  @Input () multiple = false;
  @Input () modelId = '';
  @Input () model!: AttachmentModelEnum;
  @Input () popupId = '';
  @Input() attachment!: Attachment;

  uploadData!: UploadData;
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
      this.uploadData = data;
    });
  }

  initForm() {
    this.form = new FormGroup({
      data: new FormControl(null, [fileValidator({ min: this.attachment ? 0 : 1 })]),
    });

    if (!this.multiple) {
      this.form.addControl('name', new FormControl(this.attachment?.name, [Validators.minLength(3)]));
    }
  }

  isValid(name: string) {
    const { invalid, touched } = this.form.controls[name];
    return invalid && touched;
  }

  getControl(name: string) {
    const control = this.form.get(name) as FormControl;    
    return control;
  }

  uploadAttachment() {    
    this.store.dispatch(new UploadAttachmentAction({ ...this.uploadData, model: this.model, modelId: this.modelId, _id: this.attachment?._id }, {
      success: () => {        
        this.popupService.close(this.popupId);
        this.form.reset();
      }
    }));
  }
}
