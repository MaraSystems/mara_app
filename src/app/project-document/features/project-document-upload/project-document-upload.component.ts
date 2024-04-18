import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UnSubscriber } from 'src/app/shared/utils/services/unsubscriber.service';
import { AppState } from 'src/app/app.state';
import { Store } from '@ngrx/store';
import { ActivatedRoute } from '@angular/router';
import { UploadDocumentAction } from 'src/app/shared/utils/store/document/document-store.action';
import { UploadData } from 'src/app/shared/utils/models/upload-data';
import { fileValidator } from 'src/app/shared/utils/validators/fileValidator';
import { DocumentData } from 'src/app/shared/utils/models/document-data';

@Component({
  selector: 'app-project-document-upload',
  templateUrl: './project-document-upload.component.html',
  styleUrls: ['./project-document-upload.component.scss']
})
export class ProjectDocumentUploadComponent extends UnSubscriber implements OnInit {
  @Input () multiple = false;
  @Input () modelId = '';
  @Input() documentData!: DocumentData;

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
      data: new FormControl(null, [fileValidator({ min: this.documentData ? 0 : 1 })]),
    });

    if (!this.multiple) {
      this.form.addControl('name', new FormControl(this.documentData?.name, [Validators.minLength(3)]));
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

  uploadDocument() {    
    this.store.dispatch(new UploadDocumentAction({ ...this.uploadData, model: 'project-document', modelId: this.modelId, _id: this.documentData?._id }, `project-document-upload-${this.documentData?._id}`));
  }
}
