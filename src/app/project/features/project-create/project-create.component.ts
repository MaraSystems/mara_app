import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Project } from '../../utils/models/project.model';
import { UnSubscriber } from 'src/app/shared/utils/services/unsubscriber.service';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.state';

@Component({
  selector: 'app-project-create',
  templateUrl: './project-create.component.html',
  styleUrls: ['./project-create.component.scss']
})
export class ProjectCreateComponent extends UnSubscriber implements OnInit {
  projectData!: Project;
  form!: FormGroup;

  constructor(
    // private store: Store<AppState>
  ){
    super();
  }
  
  ngOnInit(): void {
    this.form = new FormGroup({
      title: new FormControl(null, [Validators.minLength(6), Validators.required]),
      category: new FormControl(null, [Validators.required]),
      tags: new FormControl(null, [Validators.required]),
      description: new FormControl(null, [Validators.maxLength(100), Validators.required]),
    });

    this.newSubscription = this.form.valueChanges.subscribe(data => {
      console.log(data);
      
    });
  }

  isValid(name: string) {
    const { invalid, touched } = this.form.controls[name];
    return invalid && touched;
  }

  createProject() {    
    
  }
}
