import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UnSubscriber } from 'src/app/shared/utils/services/unsubscriber.service';
import { ProjectDeliverable } from '../../utils/models/project-deliverable.model';
import { AppState } from 'src/app/app.state';
import { Store } from '@ngrx/store';
import { CreateProjectDeliverableAction, UpdateProjectDeliverableAction } from '../../utils/store/project-deliverable-store.action';
import { fileValidator } from 'src/app/shared/utils/validators/fileValidator';
import { ActivatedRoute } from '@angular/router';
import { selectProjectDeliverableById } from '../../utils/store/project-deliverable-store.selector';

@Component({
  selector: 'app-project-deliverable-update',
  templateUrl: './project-deliverable-update.component.html',
  styleUrls: ['./project-deliverable-update.component.scss']
})
export class ProjectDeliverableUpdateComponent extends UnSubscriber implements OnInit {
  deliverable!: ProjectDeliverable;
  updateData!: Partial<ProjectDeliverable>;
  deliverableId!: string;
  form!: FormGroup;

  constructor(
    public store: Store<AppState>,
    private activatedRoute: ActivatedRoute
  ){
    super();
  }
  
  ngOnInit(): void {    
    this.deliverableId = this.activatedRoute.snapshot.paramMap.get('deliverable_id') as string;    

    this.newSubscription = this.store.select(selectProjectDeliverableById(this.deliverableId)).subscribe(deliverable => {
      this.deliverable = deliverable;      
      this.initForm();
    });

    this.newSubscription = this.form.valueChanges.subscribe(data => {      
      this.updateData = data;
    });
  }

  initForm() {
    this.form = new FormGroup({
      title: new FormControl(this.deliverable.title, [Validators.minLength(3), Validators.required]),
      price: new FormControl(this.deliverable.price, [Validators.required, Validators.min(1)]),
      duration: new FormControl(this.deliverable.duration, [Validators.required, Validators.min(1)]),
      description: new FormControl(this.deliverable.description, [Validators.maxLength(1000)]),
      documents: new FormControl(this.deliverable.documents, [fileValidator({ min: 1 })]),
      image: new FormControl(this.deliverable.image),
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

  updateDeliverable() {    
    this.store.dispatch(new UpdateProjectDeliverableAction({ id: this.deliverableId, changes: this.updateData}, 'project-deliverable-update'));
  }
}
