import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { PopupService } from '../../../general/features/popup/popup.service';
import { AttachmentViewComponent } from '../attachment-view/attachment-view.component';

@Component({
  selector: 'app-attachment-item',
  templateUrl: './attachment-item.component.html',
  styleUrls: ['./attachment-item.component.scss']
})
export class AttachmentItemComponent extends AttachmentViewComponent implements OnInit {
  constructor(
    public override store: Store,
    public override popupService: PopupService
  ){
    super(store, popupService);
  }

  override ngOnInit(): void {  
    this.version = this.version 
      ? this.version
      : this.attachment.versions.length - 1;

    this.url = this.attachment.versions[this.version]?.url || '';  
    this.setOptions();
  }
}
