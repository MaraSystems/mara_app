import { Component, Input, OnInit } from '@angular/core';
import { More } from '../../utils/models/more.model';
import { PopupService } from '../../features/popup/features/popup.service';

@Component({
  selector: 'app-more',
  templateUrl: './more.component.html',
  styleUrls: ['./more.component.scss']
})
export class MoreComponent implements OnInit {
  @Input() list: More[] = [];
  @Input() flat = true;
  @Input() elevated = true;
  
  show = false;
  icon = '';

  constructor(
    private popupService: PopupService
  ){}

  ngOnInit(): void {
    this.icon = this.flat ? 'more_horiz' : 'more_vert';    
  }

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
