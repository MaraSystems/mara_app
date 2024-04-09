import { Component, Input, OnInit } from '@angular/core';
import { More } from '../../utils/models/more.model';
import { PopupService } from '../../features/popup/features/popup.service';

@Component({
  selector: 'app-more',
  templateUrl: './more.component.html',
  styleUrls: ['./more.component.scss']
})
export class MoreComponent {
  @Input() list: More[] = [];
  show = false;

  constructor(
    private popupService: PopupService
  ){}

  clicked(i: number): void {
    this.show = false;
    const item = this.list[i];

    if (item.action) {
      item.action();
    }
    
    if (item.popup) {
      this.popupService.open(item.popup);
    }
  }
}
