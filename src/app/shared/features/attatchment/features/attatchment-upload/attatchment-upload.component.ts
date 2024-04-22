import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UnSubscriber } from 'src/app/shared/utils/services/unsubscriber.service';
import { AppState } from 'src/app/app.state';
import { Store } from '@ngrx/store';
import { UploadAttatchmentAction } from 'src/app/shared/features/attatchment/utils/store/attatchment-store.action';
import { fileValidator } from 'src/app/shared/utils/validators/fileValidator';
import { Attatchment } from '../../utils/models/attatchment.model';
import { UploadData } from '../../utils/models/upload-data';

@Component({
  selector: 'app-attatchment-upload',
  templateUrl: './attatchment-upload.component.html',
  styleUrls: ['./attatchment-upload.component.scss']
})
export class AttatchmentUploadComponent extends UnSubscriber implements OnInit {
  @Input () multiple = false;
  @Input () modelId = '';
  @Input () model = '';
  @Input () popupId = '';
  @Input() attatchment!: Attatchment;

  uploadData!: UploadData;
  form!: FormGroup;

  constructor(
    public store: Store<AppState>
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
      data: new FormControl(null, [fileValidator({ min: this.attatchment ? 0 : 1 })]),
    });

    if (!this.multiple) {
      this.form.addControl('name', new FormControl(this.attatchment?.name, [Validators.minLength(3)]));
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

  uploadAttatchment() {    
    this.store.dispatch(new UploadAttatchmentAction({ ...this.uploadData, model: this.model, modelId: this.modelId, _id: this.attatchment?._id }, this.popupId));
  }
}
