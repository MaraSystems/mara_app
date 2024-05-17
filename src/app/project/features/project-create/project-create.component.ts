import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Project } from '../../utils/models/project.model';
import { UnSubscriber } from 'src/app/general/utils/services/unsubscriber.service';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.state';
import { CreateProjectAction } from '../../utils/store/project-store.action';
import { projectCategories } from 'src/app/general/utils/models/project-categories';
import { selectActiveAuth } from 'src/app/auth/utils/store/auth-store.selector';
import { SharePrivacyEnum } from 'src/app/general/features/share/utils/models/share.privacy-enum';
import { ShareAccessEnum } from 'src/app/general/features/share/utils/models/share.access-enum';
import { Privacy } from 'src/app/general/features/share/utils/models/privacy';
import { AddToast } from 'src/app/general/features/toast/utils/store/toast.action';
import { Router } from '@angular/router';
import { ProjectStatus } from '../../utils/models/project-status.enum';


@Component({
  selector: 'app-project-create',
  templateUrl: './project-create.component.html',
  styleUrls: ['./project-create.component.scss']
})
export class ProjectCreateComponent extends UnSubscriber implements OnInit {
  project!: Project;
  form!: FormGroup;
  categories = projectCategories;

  constructor(
    public store: Store<AppState>,
    public router: Router
  ){
    super();
  }
  
  ngOnInit(): void {
    this.initForm();

    this.newSubscription = this.form.valueChanges.subscribe(data => {      
      this.project = data;
    });

    this.newSubscription = this.store.select(selectActiveAuth).subscribe(auth => {      
      this.form.get('userId')?.setValue(auth.id);
    });
  }

  initForm() {
    this.form = new FormGroup({
      title: new FormControl(null, [Validators.minLength(3), Validators.required]),
      category: new FormControl(null, [Validators.required]),
      tags: new FormControl(null, [Validators.required]),
      description: new FormControl(null, [Validators.maxLength(10000)]),
      userId: new FormControl(null),
      privacy: new FormControl({ type: SharePrivacyEnum.PUBLIC, access: ShareAccessEnum.ENGAGE } as Privacy),
      status: new FormControl(ProjectStatus.DRAFT),
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

  createProject() {    
    this.store.dispatch(new CreateProjectAction(this.project, {
      success: () => {        
        this.store.dispatch(new AddToast({ description: 'Project creation successful' }));
        this.router.navigateByUrl('/projects');
      },
      failure: () => {
        this.store.dispatch(new AddToast({ description: 'Project creation failed' }));
      }
    }));
  }
}
