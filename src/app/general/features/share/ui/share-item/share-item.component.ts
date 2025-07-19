import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { BaseComponent } from 'src/app/general/utils/services/basecomponent.service';
import { Share } from '../../utils/models/share';
import { GetClientAction } from 'src/app/users/utils/store/client-store.action';
import { selectClientById } from 'src/app/users/utils/store/client-store.selector';
import { ShareAccessType } from '../../utils/models/share-access';
import { FormControl } from '@angular/forms';
import { DeleteShareAction, UpdateShareAction } from '../../utils/store/share-store.action';

@Component({
  selector: 'app-share-item',
  templateUrl: './share-item.component.html',
  styleUrls: ['./share-item.component.scss']
})
export class ShareItemComponent extends BaseComponent implements OnInit {
  @Input() share!: Share;

  @Output() changed = new EventEmitter<ShareAccessType>();

  control!: FormControl;

  accessEnum = ShareAccessType;
  accessList: ShareAccessType[] = [
    ShareAccessType.VIEW,
    ShareAccessType.ENGAGE
  ];

  constructor(
    public store: Store
  ) {
    super();
   }

  ngOnInit(): void {
    this.control = new FormControl<ShareAccessType>(this.share.access);

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
