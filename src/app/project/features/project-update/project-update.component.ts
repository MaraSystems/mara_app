import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Project } from '../../utils/models/project.model';
import { UnSubscriber } from 'src/app/shared/utils/services/unsubscriber.service';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.state';
import {  GetProjectAction, UpdateProjectAction } from '../../utils/store/project-store.action';
import { projectCategories } from 'src/app/shared/utils/models/project-categories';
import { ActivatedRoute } from '@angular/router';
import { selectProjectById } from '../../utils/store/project-store.selector';
import { PopupService } from 'src/app/shared/features/popup/features/popup.service';

@Component({
  selector: 'app-project-update',
  templateUrl: './project-update.component.html',
  styleUrls: ['./project-update.component.scss']
})
export class ProjectUpdateComponent extends UnSubscriber implements OnInit {
  id!: string;
  project!: Project;
  updateData!: Partial<Project>;
  form!: FormGroup;
  categories = projectCategories;

  constructor(
    public store: Store<AppState>,
    private activatedRoute: ActivatedRoute,
    private popupService: PopupService
  ){
    super();
  }
  
  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.paramMap.get('project_id') as string;
    this.store.dispatch(new GetProjectAction(this.id)); 

    this.newSubscription = this.store.select(selectProjectById(this.id)).subscribe(project => {
      this.project = project;      
      this.initForm();
    });
   
    this.newSubscription = this.form.valueChanges.subscribe(data => {      
      this.updateData = data;
    });
  }

  initForm() {
    this.form = new FormGroup({
      title: new FormControl(this.project?.title, [Validators.minLength(3), Validators.required]),
      category: new FormControl(this.project?.category, [Validators.required]),
      tags: new FormControl(this.project?.tags, [Validators.required]),
      description: new FormControl(this.project?.description, [Validators.maxLength(5000)]),
      image: new FormControl(this.project?.image),
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

  saveProject() {    
    this.store.dispatch(new UpdateProjectAction({ id: this.id, changes: this.updateData }, 'project-update'));
  }
}
