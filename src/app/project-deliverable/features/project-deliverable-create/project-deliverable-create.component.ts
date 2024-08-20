import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UnSubscriber } from 'src/app/general/utils/services/unsubscriber.service';
import { ProjectDeliverable } from '../../utils/models/project-deliverable';
import { AppState } from 'src/app/app.state';
import { Store } from '@ngrx/store';
import { CreateProjectDeliverableAction } from '../../utils/store/project-deliverable-store.action';
import { ActivatedRoute, Router } from '@angular/router';
import { selectActiveAuth } from 'src/app/auth/utils/store/auth-store.selector';
import { SharePrivacyType } from 'src/app/general/features/share/utils/models/share-privacy-type';
import { ShareAccessType } from 'src/app/general/features/share/utils/models/share-access-type';
import { Privacy } from 'src/app/general/features/share/utils/models/privacy';
import { AddToast } from 'src/app/general/features/toast/utils/store/toast.action';

@Component({
  selector: 'app-project-deliverable-create',
  templateUrl: './project-deliverable-create.component.html',
  styleUrls: ['./project-deliverable-create.component.scss']
})
export class ProjectDeliverableCreateComponent extends UnSubscriber implements OnInit {
  deliverable!: ProjectDeliverable;
  form!: FormGroup;
  projectId!: string;

  constructor(
    public store: Store<AppState>,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ){
    super();
  }
  
  ngOnInit(): void {
    this.projectId = this.activatedRoute.snapshot.paramMap.get('project_id') as string;
    this.initForm();

    this.newSubscription = this.form.valueChanges.subscribe(data => {      
      this.deliverable = data;
    });

    this.newSubscription = this.store.select(selectActiveAuth).subscribe(auth => {      
      this.form.get('userId')?.setValue(auth.id);
    });
  }

  initForm() {
    this.form = new FormGroup({
      title: new FormControl(null, [Validators.minLength(3), Validators.required]),
      price: new FormControl(null, [Validators.required, Validators.min(1)]),
      duration: new FormControl(null, [Validators.required, Validators.min(1)]),
      description: new FormControl(null, [Validators.maxLength(10000)]),
      projectId: new FormControl(this.projectId),
      documents: new FormControl([]),
      hidden: new FormControl(false),
      likes: new FormControl([]),
      bookmarks: new FormControl([]),
      shares: new FormControl(0)
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
    this.store.dispatch(new CreateProjectDeliverableAction(this.deliverable, {
      success: () => {        
        this.store.dispatch(new AddToast({ title: 'Deliverable creation successful' }));
        this.router.navigateByUrl(`/projects/${this.projectId}`);
      },
      failure: () => {
        this.store.dispatch(new AddToast({ title: 'Deliverable creation failed' }));
      }
    }));
  }
}
