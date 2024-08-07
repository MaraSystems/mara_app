import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { More } from 'src/app/general/utils/models/more.model';
import { UnSubscriber } from 'src/app/general/utils/services/unsubscriber.service';
import { DeleteAttachmentAction, GetAttachmentAction } from 'src/app/general/features/attachment/utils/store/attachment-store.action';
import { selectAttachmentById } from 'src/app/general/features/attachment/utils/store/attachment-store.selector';
import { Attachment } from '../../utils/models/attachment.model';
import { PopupService } from '../../../popup/features/popup.service';
import { Toast } from '../../../toast/utils/models/toast.class';

@Component({
  selector: 'app-attachment-item',
  templateUrl: './attachment-item.component.html',
  styleUrls: ['./attachment-item.component.scss']
})
export class AttachmentItemComponent extends UnSubscriber implements OnInit {
  @Input({ required: true }) id!: string;
  @Input() deletable = false;
  attachment!: Attachment;

  moreList: More[] = [];

  constructor(
    public store: Store,
    public popupService: PopupService
  ){
    super();
  }

  ngOnInit(): void {
    this.store.dispatch(new GetAttachmentAction(this.id));

    this.newSubscription = this.store.select(selectAttachmentById(this.id)).subscribe(attachment => {      
      this.attachment = attachment;            
    });

    this.moreList = [
      { name: 'Update', icon: 'update', popup: `attachment-update-${this.id}` },
    ];
    if (this.deletable) {
      this.moreList.push({ name: 'Delete', icon: 'delete', action: () => { this.delete() } });
    }
  }

  delete() {
    Toast.warn(this.store, 'Click continue to delete attachment', ['Continue'], () => {
      this.store.dispatch(new DeleteAttachmentAction(this.id));
    });
  }
}
