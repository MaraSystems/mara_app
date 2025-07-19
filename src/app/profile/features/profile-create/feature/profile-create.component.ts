import { Component, OnInit } from '@angular/core';
import { User } from '../../../../users/utils/models/user';
import { BaseComponent } from 'src/app/general/utils/services/basecomponent.service';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.state';
import { PopupService } from 'src/app/general/features/popup/popup.service';
import { UpdateProfileAction } from 'src/app/users/utils/store/user-store.action';
import { OnboardStatus } from 'src/app/profile/utils/onboard-status';
import { selectAuthUser } from 'src/app/users/utils/store/user-store.selector';
import { AddToast } from 'src/app/general/features/toast/utils/store/toast.action';
import { LogoutAuthAction } from 'src/app/auth/utils/store/auth-store.action';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile-create',
  templateUrl: './profile-create.component.html',
  styleUrls: ['./profile-create.component.scss']
})
export class ProfileCreateComponent extends BaseComponent implements OnInit {
  profile!: User;
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
    this.newSubscription = this.store.select(selectAuthUser).subscribe(user => {
      this.profile = user;
    })
  }

  nextPage() {
    this.currentPage++;
    if (this.currentPage > this.pagelength) {
      this.store.dispatch(new UpdateProfileAction({ onboard: OnboardStatus.COMPLETED }, {
        success: () => {
          this.store.dispatch(new AddToast({ title: 'Welcome Onboard' }));
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
