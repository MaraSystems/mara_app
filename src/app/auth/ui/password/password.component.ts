import { Component, Input, OnInit, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.state';
import { InputComponent } from 'src/app/shared/ui/input/input.component';
import { GetPasswordAuthAction } from '../../utils/store/auth-store.action';


@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => PasswordComponent),
      multi: true
    }
  ]
})
export class PasswordComponent extends InputComponent {
  @Input() clientEmail: string = '';
  duration = 120;
  running = false;

  get timeLeft() {
    const seconds = this.duration%60;
    const minutes = Math.floor(this.duration/60);
    return `${minutes}:${seconds}${seconds > 9 ? '' : '0'}`;
  }

  constructor(
    private store: Store<AppState>,
  ) {
    super();
  }

  public request() {    
    this.running = true;
    this.store.dispatch(new GetPasswordAuthAction(this.clientEmail));

    const interval = setInterval(() => {
      this.duration--;
      if (this.duration === 0) {
        clearInterval(interval);
        this.running = false;
        this.duration = 120;
      }
    }, 1000);
  }
}
