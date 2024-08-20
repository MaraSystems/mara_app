import { AfterContentChecked, AfterRenderRef, AfterViewChecked, AfterViewInit, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { More } from 'src/app/general/utils/models/more';
import { UnSubscriber } from 'src/app/general/utils/services/unsubscriber.service';
import { DeleteAttachmentAction, UpdateAttachmentAction, UploadAttachmentAction } from 'src/app/general/features/attachment/utils/store/attachment-store.action';
import { Attachment } from '../../utils/models/attachment';
import { PopupService } from '../../../popup/popup.service';
import { Toast } from '../../../toast/utils/models/toast';
import { AttachmentType } from '../../utils/models/attachment-type';
import { AttachmentVersion } from '../../utils/models/attachment-version';

@Component({
  selector: 'app-attachment-view',
  templateUrl: './attachment-view.component.html',
  styleUrls: ['./attachment-view.component.scss']
})
export class AttachmentViewComponent extends UnSubscriber implements OnInit {
  @Input() small = true;
  @Input({ required: true }) attachment!: Attachment;
  @Input() viewOnly = false;
  @Input() deletable = false;
  @Input() version = 0;
  @Output() updated = new EventEmitter();
  @Input() userId = '';

  moreList: More[] = [];
  url = '';
  canPreview = false;
  previewed = false;

  constructor(
    public store: Store,
    public popupService: PopupService
  ){
    super();
  }

  ngOnInit(): void {    
    this.version = this.version 
      ? this.version
      : this.attachment.versions.length - 1;
    
    this.url = this.attachment.versions[this.version]?.url || '';
    this.setOptions();
  }

  setOptions() {    
    if (!this.viewOnly) {
      this.moreList.push({ name: 'Update', icon: 'update', popup: `attachment-update-${this.attachment._id}` });
    }
        
    if (this.deletable) {
      this.moreList.push({ name: 'Delete', icon: 'delete', action: () => { this.delete() } });
    }

    this.canPreview = [AttachmentType.CONTRACT_DELIVERABLE].includes(this.attachment.model);
    this.pickVersion(this.version);    
  }

  pickVersion(version: number) {
    this.version = version;
    this.previewed = this.attachment.versions[this.version].previews.includes(this.userId);   

    if (!this.previewed && this.canPreview) {
      this.moreList.push({ name: 'Seen', icon: 'visibility', action: () => { this.preview() } });
    }

    if (this.previewed && this.canPreview) {
      this.moreList.push({ name: 'Unsee', icon: 'visibility_off', action: () => { this.preview() } });
    }
  }

  delete() {
    Toast.warn(this.store, 'Click continue to delete attachment', ['Continue'], () => {
      this.store.dispatch(new DeleteAttachmentAction(this.attachment._id));
    });
  }

  preview() {
    const previewed = this.attachment.versions[this.version].previews.includes(this.userId);
    const versions = JSON.parse(JSON.stringify(this.attachment.versions)) as AttachmentVersion[];
    let previews = [...versions[this.version].previews, this.userId];
    if (previewed) {
      previews = previews.filter(id => id !== this.userId);
    }
    versions[this.version].previews = previews;    

    this.store.dispatch(new UpdateAttachmentAction({ id: this.attachment._id, changes: { versions }}));
  }
}
