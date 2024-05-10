import { Component, EventEmitter, Input, OnInit, Output, Type } from '@angular/core';
import { Share } from '../utils/models/share.model';
import { Privacy } from '../utils/models/privacy';
import { ShareEnum } from '../utils/models/share.enum';
import { SharePrivacyEnum } from '../utils/models/share.privacy-enum';
import { ShareAccessEnum } from '../utils/models/share.access-enum';
import { Store } from '@ngrx/store';
import { UnSubscriber } from 'src/app/general/utils/services/unsubscriber.service';
import { ListSharesAction } from '../utils/store/share-store.action';
import { GetClientAction } from 'src/app/client/utils/store/client-store.action';
import { selectClientById } from 'src/app/client/utils/store/client-store.selector';
import { ShareStateEnum } from '../utils/models/share.state-enum';
import { selectSharesByModelId } from '../utils/store/share-store.selector';

@Component({
  selector: 'app-share',
  templateUrl: './share.component.html',
  styleUrls: ['./share.component.scss']
})
export class ShareComponent extends UnSubscriber implements OnInit {
  @Input() model!: ShareEnum;
  @Input() modelId!: string;
  @Input() privacy!: SharePrivacyEnum;
  @Input() access!: ShareAccessEnum;
  @Input() link!: string;
  @Input() ownerId!: string;

  @Output() changed = new EventEmitter<Privacy>();
  @Output() shareTo = new EventEmitter<string[]>();

  sharedList: Share[] = [];

  constructor(
    public store: Store
  ) { 
    super();
  }

  ngOnInit(): void {
    if (this.privacy) {
      this.store.dispatch(new ListSharesAction(this.model, this.modelId));
      this.store.dispatch(new GetClientAction(this.ownerId));
      this.newSubscription = this.store.select(selectClientById(this.ownerId)).subscribe(client => {
        const owner: any = { userId: client._id, email: client.email, access: ShareAccessEnum.OWNER, model: this.model, modelId: this.modelId, state: ShareStateEnum.ACCEPTED };    

        this.newSubscription = this.store.select(selectSharesByModelId(this.model, this.modelId)).subscribe(sharedList => {
          this.sharedList = [owner, ...sharedList]; 
        });
      });
    }
  }

  updatePrivacy(data: Privacy) {
    this.changed.emit(data);
  }

  share(list: string[]){    
    this.shareTo.emit(list);
  }
}
