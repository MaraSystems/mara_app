import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { PopupService } from 'src/app/general/features/popup/features/popup.service';
import { UnSubscriber } from 'src/app/general/utils/services/unsubscriber.service';
import { ListAttachmentsAction } from '../../utils/store/attatchment-store.action';
import { selectAttachmentsByModelId } from '../../utils/store/attatchment-store.selector';
import { Attachment } from '../../utils/models/attatchment.model';

@Component({
  selector: 'app-attachment-list',
  templateUrl: './attachment-list.component.html',
  styleUrls: ['./attachment-list.component.scss']
})
export class AttachmentListComponent extends UnSubscriber implements OnInit {
  @Input() modelId = '';
  @Input() model = '';
  attachments: Attachment[] = [];

  constructor(
    public store: Store,
    public popupService: PopupService
  ){
    super();
  }

  ngOnInit(): void {    
    this.store.dispatch(new ListAttachmentsAction(this.model, this.modelId));

    this.newSubscription = this.store.select(selectAttachmentsByModelId(this.model, this.modelId)).subscribe(attachments => {
      this.attachments = attachments;      
    });
  }
}
