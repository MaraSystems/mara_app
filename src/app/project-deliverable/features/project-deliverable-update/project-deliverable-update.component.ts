import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UnSubscriber } from 'src/app/general/utils/services/unsubscriber.service';
import { ProjectDeliverable } from '../../utils/models/project-deliverable.model';
import { AppState } from 'src/app/app.state';
import { Store } from '@ngrx/store';
import { CreateProjectDeliverableAction, UpdateProjectDeliverableAction } from '../../utils/store/project-deliverable-store.action';
import { ActivatedRoute } from '@angular/router';
import { selectProjectDeliverableById } from '../../utils/store/project-deliverable-store.selector';
import { AddToast } from 'src/app/general/features/toast/utils/store/toast.action';
import { PopupService } from 'src/app/general/features/popup/features/popup.service';
import { ToastEnum } from 'src/app/general/features/toast/utils/models/toast.enum';

@Component({
  selector: 'app-project-deliverable-update',
  templateUrl: './project-deliverable-update.component.html',
  styleUrls: ['./project-deliverable-update.component.scss']
})
export class ProjectDeliverableUpdateComponent extends UnSubscriber implements OnInit {
  deliverable!: ProjectDeliverable;
  updateData!: Partial<ProjectDeliverable>;
  id!: string;
  form!: FormGroup;

  constructor(
    public store: Store<AppState>,
    private activatedRoute: ActivatedRoute,
    private popupService: PopupService
  ){
    super();
  }
  
  ngOnInit(): void {    
    this.id = this.activatedRoute.snapshot.paramMap.get('deliverable_id') as string;    

    this.newSubscription = this.store.select(selectProjectDeliverableById(this.id)).subscribe(deliverable => {
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
      description: new FormControl(this.deliverable.description, [Validators.maxLength(10000)])
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
    this.store.dispatch(new UpdateProjectDeliverableAction({ id: this.id, changes: this.updateData}, {
      success: () => {
        this.store.dispatch(new AddToast({ description: 'Project Deliverable Update' }));
        this.popupService.close(`project-deliverable-update-${this.id}`);
      },
      failure: () => {
        this.store.dispatch(new AddToast({ description: 'Project Deliverable Update', type: ToastEnum.ERROR }));
      }
    }));
  }
}
