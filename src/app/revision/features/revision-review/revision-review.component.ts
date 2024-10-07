import { Component, OnInit } from '@angular/core';
import { BaseComponent } from 'src/app/general/utils/services/basecomponent.service';
import { Store } from '@ngrx/store';
import { ActivatedRoute, Router } from '@angular/router';
import { Revision } from '../../utils/models/revision';
import { GetRevisionAction, ListRevisionsAction, UpdateRevisionAction } from '../../utils/store/revision-store.action';
import { PopupService } from 'src/app/general/features/popup/popup.service';
import { selectActiveAuth } from 'src/app/auth/utils/store/auth-store.selector';
import { selectRevisionById } from '../../utils/store/revision-store.selector';
import { Attachment } from 'src/app/attachment/utils/models/attachment';
import { ListAttachmentsAction } from 'src/app/attachment/utils/store/attachment-store.action';
import { selectAttachmentsByModelId } from 'src/app/attachment/utils/store/attachment-store.selector';
import { AddToast } from 'src/app/general/features/toast/utils/store/toast.action';
import { RevisionStatus } from '../../utils/models/revision-status';
import { CommentType } from 'src/app/comment/utils/models/comment-type';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { KeyValue } from '@angular/common';
import { getFormControl } from 'src/app/general/utils/lib/getFormControl';


@Component({
  selector: 'app-revision-review',
  templateUrl: './revision-review.component.html',
  styleUrls: ['./revision-review.component.scss']
})
export class RevisionReviewComponent extends BaseComponent implements OnInit{
  id: string = '';
  userId: string = '';
  attachments: Attachment[] = [];
  revision!: Revision;
  previewAttachmentId = '';
  commentType = CommentType;
  form!: FormGroup;
  decisionChoises: KeyValue<string, string>[] = [
    { key: RevisionStatus.COMMENT, value: 'Just a comment' },
    { key: RevisionStatus.AMEND, value: 'Request for changes' },
    { key: RevisionStatus.APPROVE, value: 'Nice!, Approved' }
  ];
  getControl = getFormControl;
  hideFiles = false;
  
  constructor(
    public store: Store,
    public activatedRoute: ActivatedRoute,
    public popupService: PopupService,
    public router: Router
  ){
    super();
  }

  ngOnInit(): void {    
    this.newSubscription = this.store.select(selectActiveAuth).subscribe(auth => {
      this.userId = auth.id;
    });

    this.id = this.activatedRoute.snapshot.paramMap.get('id') as string;    
    this.store.dispatch(new GetRevisionAction(this.id));

    this.newSubscription = this.store.select(selectRevisionById(this.id)).subscribe(revision => {
      this.revision = revision;
      if (this.revision) {        
        this.initForm();
        this.store.dispatch(new ListAttachmentsAction(this.revision.model as any, this.revision.modelId));

        this.newSubscription = this.store.select(selectAttachmentsByModelId(this.revision.model, this.revision.modelId)).subscribe(attachments => {
          this.attachments = attachments;     
          this.previewAttachmentId = attachments[0]._id;          
        });
      }
      
    });
  }

  initForm() {
    this.form = new FormGroup({
      decision: new FormControl(this.revision.status === RevisionStatus.PENDING ? '' : this.revision.status, [Validators.required]),
    });    
  }

  submitRevision(commentId: string) {
    const status: RevisionStatus = getFormControl(this.form, 'decision').value;

    this.store.dispatch(new UpdateRevisionAction({ id: this.id, changes: { status, commentId } }, {
      success: () => {
        this.store.dispatch(new AddToast({ title: 'Revision submitsion successful' }));
        this.router.navigateByUrl(`/revisions?model=${this.revision.model}&modelId=${this.revision.modelId}`);
      },
      failure: () => this.store.dispatch(new AddToast({ title: 'Revision submitsion failed' })),
    }));
  }

  addComment(id: string) {
    this.store.dispatch(new UpdateRevisionAction({ id: this.id, changes: { comments: [...this.revision.comments, id] } }));
  }

  removeComment(id: string) {

  }
}
