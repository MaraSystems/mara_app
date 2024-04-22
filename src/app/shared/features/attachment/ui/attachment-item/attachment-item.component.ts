import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { More } from 'src/app/shared/utils/models/more.model';
import { UnSubscriber } from 'src/app/shared/utils/services/unsubscriber.service';
import { DeleteAttachmentAction, GetAttachmentAction } from 'src/app/shared/features/attachment/utils/store/attatchment-store.action';
import { selectAttachmentById } from 'src/app/shared/features/attachment/utils/store/attatchment-store.selector';
import { Attachment } from '../../utils/models/attatchment.model';

@Component({
  selector: 'app-attachment-item',
  templateUrl: './attachment-item.component.html',
  styleUrls: ['./attachment-item.component.scss']
})
export class AttachmentItemComponent extends UnSubscriber implements OnInit {
  @Input() id!: string;
  attachment!: Attachment;

  moreList: More[] = [];

  constructor(
    public store: Store
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
      { name: 'Delete', icon: 'delete', popup: `attachment-delete-${this.id}` }
    ];
  }

  deleteAttachment() {
    this.store.dispatch(new DeleteAttachmentAction(this.id));
  }
}
