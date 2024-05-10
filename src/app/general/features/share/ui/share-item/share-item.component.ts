import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { UnSubscriber } from 'src/app/general/utils/services/unsubscriber.service';
import { Share } from '../../utils/models/share.model';
import { GetClientAction } from 'src/app/client/utils/store/client-store.action';
import { selectClientById } from 'src/app/client/utils/store/client-store.selector';
import { ShareAccessEnum } from '../../utils/models/share.access-enum';
import { FormControl } from '@angular/forms';
import { DeleteShareAction, UpdateShareAction } from '../../utils/store/share-store.action';

@Component({
  selector: 'app-share-item',
  templateUrl: './share-item.component.html',
  styleUrls: ['./share-item.component.scss']
})
export class ShareItemComponent extends UnSubscriber implements OnInit {
  @Input() share!: Share;

  @Output() changed = new EventEmitter<ShareAccessEnum>();

  control!: FormControl;

  accessEnum = ShareAccessEnum;
  accessList: ShareAccessEnum[] = [
    ShareAccessEnum.VIEW,
    ShareAccessEnum.ENGAGE
  ];

  constructor(
    public store: Store
  ) {
    super();
   }

  ngOnInit(): void {
    this.control = new FormControl<ShareAccessEnum>(this.share.access);

    if (this.share.userId) {
      this.store.dispatch(new GetClientAction(this.share.userId));
      this.newSubscription = this.store.select(selectClientById(this.share.userId)).subscribe(user => {
        this.share = { ...this.share, fullname: `${user.firstname} ${user.lastname}`, image: user.image };
      });
    }

    this.control.valueChanges.subscribe(access => {
      this.store.dispatch(new UpdateShareAction({ id: this.share._id, changes: { access }}));
    });
  }

  revoke(){
    this.store.dispatch(new DeleteShareAction(this.share._id));
  }
}
