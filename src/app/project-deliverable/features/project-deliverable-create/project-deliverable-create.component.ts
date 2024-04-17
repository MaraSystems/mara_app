import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UnSubscriber } from 'src/app/shared/utils/services/unsubscriber.service';
import { ProjectDeliverable } from '../../utils/models/project-deliverable.model';
import { AppState } from 'src/app/app.state';
import { Store } from '@ngrx/store';
import { CreateProjectDeliverableAction } from '../../utils/store/project-deliverable-store.action';
import { fileValidator } from 'src/app/shared/utils/validators/fileValidator';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-project-deliverable-create',
  templateUrl: './project-deliverable-create.component.html',
  styleUrls: ['./project-deliverable-create.component.scss']
})
export class ProjectDeliverableCreateComponent extends UnSubscriber implements OnInit {
  deliverableData!: ProjectDeliverable;
  projectId!: string;
  form!: FormGroup;

  constructor(
    public store: Store<AppState>,
    private activatedRoute: ActivatedRoute
  ){
    super();
  }
  
  ngOnInit(): void {
    this.initForm();

    this.newSubscription = this.form.valueChanges.subscribe(data => {      
      this.deliverableData = data;
    });

    this.projectId = this.activatedRoute.snapshot.paramMap.get('project_id') as string;    
  }

  initForm() {
    this.form = new FormGroup({
      title: new FormControl(null, [Validators.minLength(3), Validators.required]),
      price: new FormControl(null, [Validators.required, Validators.min(1)]),
      duration: new FormControl(null, [Validators.required, Validators.min(1)]),
      description: new FormControl(null, [Validators.maxLength(1000)])
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

  createDeliverable() {    
    this.store.dispatch(new CreateProjectDeliverableAction({ ...this.deliverableData, projectId: this.projectId }));
  }
}
