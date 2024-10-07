import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { PopupService } from 'src/app/general/features/popup/popup.service';
import { BaseComponent } from 'src/app/general/utils/services/basecomponent.service';
import { ListAttachmentsAction } from '../../utils/store/attachment-store.action';
import { selectAttachmentsByModelId } from '../../utils/store/attachment-store.selector';
import { Attachment } from '../../utils/models/attachment';
import { AttachmentType } from '../../utils/models/attachment-type';
import { selectActiveAuth } from 'src/app/auth/utils/store/auth-store.selector';

@Component({
  selector: 'app-attachment-list',
  templateUrl: './attachment-list.component.html',
  styleUrls: ['./attachment-list.component.scss']
})
export class AttachmentListComponent extends BaseComponent implements OnInit {
  @Input() modelId = '';
  @Input() model!: AttachmentType;
  @Input() add = true;
  @Input() viewOnly = false;
  @Output() commented = new EventEmitter<string>();

  attachments: Attachment[] = [];
  userId = '';

  constructor(
    public store: Store,
    public popupService: PopupService
  ){
    super();
  }

  ngOnInit(): void {    
    this.newSubscription = this.store.select(selectActiveAuth).subscribe(auth => {
      this.userId = auth.id;
    });
    
    this.store.dispatch(new ListAttachmentsAction(this.model, this.modelId));

    this.newSubscription = this.store.select(selectAttachmentsByModelId(this.model, this.modelId)).subscribe(attachments => {
      this.attachments = attachments;     
    });
  }
}
