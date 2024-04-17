import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UnSubscriber } from 'src/app/shared/utils/services/unsubscriber.service';
import { AppState } from 'src/app/app.state';
import { Store } from '@ngrx/store';
import { ActivatedRoute } from '@angular/router';
import { UploadDocumentAction } from 'src/app/shared/utils/store/document/document-store.action';
import { UploadData } from 'src/app/shared/utils/models/upload-data';
import { fileValidator } from 'src/app/shared/utils/validators/fileValidator';

@Component({
  selector: 'app-project-document-create',
  templateUrl: './project-document-create.component.html',
  styleUrls: ['./project-document-create.component.scss']
})
export class ProjectDocumentCreateComponent extends UnSubscriber implements OnInit {
  @Input () multiple = false;
  @Input () modelId!: string;

  documentData!: UploadData;
  form!: FormGroup;

  constructor(
    public store: Store<AppState>
  ){
    super();
  }
  
  ngOnInit(): void {    
    this.initForm();    

    this.newSubscription = this.form.valueChanges.subscribe(data => {      
      this.documentData = data;
    });
  }

  initForm() {
    this.form = new FormGroup({
      data: new FormControl(null, [fileValidator({ min: 1 })]),
    });

    if (!this.multiple) {
      this.form.addControl('name', new FormControl(null, [Validators.minLength(3)]));
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

  createDocument() {    
    this.store.dispatch(new UploadDocumentAction({ ...this.documentData, model: 'project-document', modelId: this.modelId }, 'project-document-create'));
  }
}
