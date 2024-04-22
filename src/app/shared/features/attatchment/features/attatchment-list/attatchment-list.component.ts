import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { PopupService } from 'src/app/shared/features/popup/features/popup.service';
import { UnSubscriber } from 'src/app/shared/utils/services/unsubscriber.service';
import { ListAttatchmentsAction } from '../../utils/store/attatchment-store.action';
import { selectAttatchmentsByModelId } from '../../utils/store/attatchment-store.selector';
import { Attatchment } from '../../utils/models/attatchment.model';

@Component({
  selector: 'app-attatchment-list',
  templateUrl: './attatchment-list.component.html',
  styleUrls: ['./attatchment-list.component.scss']
})
export class AttatchmentListComponent extends UnSubscriber implements OnInit {
  @Input() modelId = '';
  @Input() model = '';
  attatchments: Attatchment[] = [];

  constructor(
    public store: Store,
    public popupService: PopupService
  ){
    super();
  }

  ngOnInit(): void {    
    this.store.dispatch(new ListAttatchmentsAction(this.model, this.modelId));

    this.newSubscription = this.store.select(selectAttatchmentsByModelId(this.model, this.modelId)).subscribe(attatchments => {
      this.attatchments = attatchments;      
    });
  }
}
