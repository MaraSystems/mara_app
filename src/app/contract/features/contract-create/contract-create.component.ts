import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Contract, ContractRequest } from '../../utils/models/contract.model';
import { BaseComponent } from 'src/app/general/utils/services/basecomponent.service';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.state';
import { CreateContractAction } from '../../utils/store/contract-store.action';
import { selectActiveAuth } from 'src/app/auth/utils/store/auth-store.selector';
import { SharePrivacyType } from 'src/app/general/features/share/utils/models/share-privacy';
import { ShareAccessType } from 'src/app/general/features/share/utils/models/share-access';
import { Privacy } from 'src/app/general/features/share/utils/models/privacy';
import { AddToast } from 'src/app/general/features/toast/utils/store/toast.action';
import { Router } from '@angular/router';
import { ContractStatus } from '../../utils/models/contract-status.enum';
import { Project } from 'src/app/project/utils/models/project';
import { GetProjectAction } from 'src/app/project/utils/store/project-store.action';
import { ListProjectDeliverablesAction } from 'src/app/project-deliverable/utils/store/project-deliverable-store.action';
import { selectAllProjectDeliverables } from 'src/app/project-deliverable/utils/store/project-deliverable-store.selector';
import { ProjectDeliverable } from 'src/app/project-deliverable/utils/models/project-deliverable';
import { ContractDeliverable } from 'src/app/contract-deliverable/utils/models/contract-deliverable.model';


@Component({
  selector: 'app-contract-create',
  templateUrl: './contract-create.component.html',
  styleUrls: ['./contract-create.component.scss']
})
export class ContractCreateComponent extends BaseComponent implements OnInit {
  contract!: ContractRequest;
  project!: Project;
  form!: FormGroup;
  deliverables: ProjectDeliverable[] = [];
  id!: string;
  price!: string;
  duration!: number;

  get summary() {
    const { price, duration } = this.deliverables.reduce((acc, red) => {
      acc.price += Number(red.price);
      acc.duration += Number(red.duration);
      return acc;
    }, { price: 0, duration: 0 });

    return { price: Intl.NumberFormat('en-US').format(price), duration };
  }


  constructor(
    public store: Store<AppState>,
    public router: Router
  ){
    super();
  }
  
  ngOnInit(): void {
    this.store.dispatch(new GetProjectAction(this.id)); 
    this.store.dispatch(new ListProjectDeliverablesAction(this.id));

    this.newSubscription = this.store.select(selectAllProjectDeliverables(this.id)).subscribe(deliverables => {
      this.deliverables = deliverables;
      const { price, duration} = this.summary;
      this.price = price;
      this.duration = duration;
    });

    this.initForm();

    this.newSubscription = this.store.select(selectActiveAuth).subscribe(auth => {      
      this.form.get('clientId')?.setValue(auth.id);
    });
  }

  initForm() {
    this.form = new FormGroup({
      clientId: new FormControl(null)
    });

    this.newSubscription = this.form.valueChanges.subscribe(data => {      
      this.contract = data;
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

  createContract() {    
    this.store.dispatch(new CreateContractAction(this.contract, {
      success: () => {        
        this.store.dispatch(new AddToast({ title: 'Contract creation successful' }));
        this.router.navigateByUrl('/contracts');
      },
      failure: () => {
        this.store.dispatch(new AddToast({ title: 'Contract creation failed' }));
      }
    }));
  }
}
