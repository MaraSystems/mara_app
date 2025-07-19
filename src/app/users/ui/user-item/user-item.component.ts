import { Component, Input, OnInit } from '@angular/core';
import { User } from '../../utils/models/user';
import { GetUserAction } from '../../utils/store/user-store.action';
import { Store } from '@ngrx/store';
import { BaseComponent } from 'src/app/general/utils/services/basecomponent.service';

@Component({
  selector: 'app-user-item',
  templateUrl: './user-item.component.html',
  styleUrls: ['./user-item.component.scss']
})
export class UserItemComponent extends BaseComponent implements OnInit {
  @Input() user!: User;
  price!: string;
  duration!: number;

  constructor(
    public store: Store
  ){
    super();
  }

  ngOnInit(): void {
    this.store.dispatch(new GetUserAction(this.user._id));
  }
}
