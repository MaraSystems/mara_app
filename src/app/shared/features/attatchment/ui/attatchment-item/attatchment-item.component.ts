import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { More } from 'src/app/shared/utils/models/more.model';
import { UnSubscriber } from 'src/app/shared/utils/services/unsubscriber.service';
import { DeleteAttatchmentAction, GetAttatchmentAction } from 'src/app/shared/features/attatchment/utils/store/attatchment-store.action';
import { selectAttatchmentById } from 'src/app/shared/features/attatchment/utils/store/attatchment-store.selector';
import { Attatchment } from '../../utils/models/attatchment.model';

@Component({
  selector: 'app-attatchment-item',
  templateUrl: './attatchment-item.component.html',
  styleUrls: ['./attatchment-item.component.scss']
})
export class AttatchmentItemComponent extends UnSubscriber implements OnInit {
  @Input() id!: string;
  attatchment!: Attatchment;

  moreList: More[] = [];

  constructor(
    public store: Store
  ){
    super();
  }

  ngOnInit(): void {
    this.store.dispatch(new GetAttatchmentAction(this.id));

    this.newSubscription = this.store.select(selectAttatchmentById(this.id)).subscribe(attatchment => {      
      this.attatchment = attatchment;            
    });

    this.moreList = [
      { name: 'Update', icon: 'update', popup: `attatchment-update-${this.id}` },
      { name: 'Delete', icon: 'delete', popup: `attatchment-delete-${this.id}` }
    ];
  }

  deleteAttatchment() {
    this.store.dispatch(new DeleteAttatchmentAction(this.id));
  }
}
