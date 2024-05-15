import { Component, OnInit } from '@angular/core';
import { Client } from '../../../../client/utils/models/client';
import { UnSubscriber } from 'src/app/general/utils/services/unsubscriber.service';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.state';
import { PopupService } from 'src/app/general/features/popup/features/popup.service';
import { UpdateClientAction } from 'src/app/client/utils/store/client-store.action';
import { OnboardEnum } from 'src/app/profile/utils/onboard.enum';
import { selectAuthClient } from 'src/app/client/utils/store/client-store.selector';
import { AddToast } from 'src/app/general/features/toast/utils/store/toast.action';
import { LogoutAuthAction } from 'src/app/auth/utils/store/auth-store.action';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile-create',
  templateUrl: './profile-create.component.html',
  styleUrls: ['./profile-create.component.scss']
})
export class ProfileCreateComponent extends UnSubscriber implements OnInit {
  profile!: Client;
  currentPage = 1;
  pagelength = 3;

  constructor (
    public store: Store<AppState>,
    public popupService: PopupService,
    public router: Router
  ) {
    super();
  }

  ngOnInit(): void {
    this.newSubscription = this.store.select(selectAuthClient).subscribe(client => {
      this.profile = client;
    })
  }

  nextPage() {
    this.currentPage++;
    if (this.currentPage > this.pagelength) {
      this.store.dispatch(new UpdateClientAction({ id: this.profile._id, changes: { onboard: OnboardEnum.COMPLETED } }, {
        success: () => {
          this.store.dispatch(new AddToast({ description: 'Welcome Onboard' }));
          this.router.navigateByUrl('/profile/info');
        }
      }));
    }
  }

  logout() {
    this.store.dispatch(new LogoutAuthAction({
      success: () => {
        this.router.navigateByUrl('/auth');
      }
    }));
  }
}
