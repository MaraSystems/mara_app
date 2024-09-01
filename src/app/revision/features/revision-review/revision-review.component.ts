import { Component, OnInit } from '@angular/core';
import { UnSubscriber } from 'src/app/general/utils/services/unsubscriber.service';
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
import { RevisionDecision } from '../../utils/models/revision-decision';
import { ToastType } from 'src/app/general/features/toast/utils/models/toast-type';
import { CommentType } from 'src/app/comment/utils/models/comment-type';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { KeyValue } from '@angular/common';
import { getFormControl } from 'src/app/general/utils/lib/getFormControl';


@Component({
  selector: 'app-revision-review',
  templateUrl: './revision-review.component.html',
  styleUrls: ['./revision-review.component.scss']
})
export class RevisionReviewComponent extends UnSubscriber implements OnInit{
  id: string = '';
  userId: string = '';
  attachments: Attachment[] = [];
  revision!: Revision;
  previewAttachmentId = '';
  commentType = CommentType;
  form!: FormGroup;
  decisionChoises: KeyValue<string, string>[] = [
    { key: RevisionDecision.COMMENT, value: 'Just a comment' },
    { key: RevisionDecision.AMEND, value: 'Request for changes' },
    { key: RevisionDecision.APPROVE, value: 'Nice!, Approved' }
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
        this.store.dispatch(new ListAttachmentsAction(this.revision.model, this.revision.modelId));

        this.newSubscription = this.store.select(selectAttachmentsByModelId(this.revision.model, this.revision.modelId)).subscribe(attachments => {
          this.attachments = attachments;     
          this.previewAttachmentId = attachments[0]._id;          
        });
      }
      
    });
  }

  initForm() {
    this.form = new FormGroup({
      decision: new FormControl(this.revision.decision, [Validators.required]),
    });    
  }

  submitRevision(commentId: string) {
    const decision: RevisionDecision = getFormControl(this.form, 'decision').value;
    const comments = [ commentId, ...this.revision.comments ];

    this.store.dispatch(new UpdateRevisionAction({ id: this.id, changes: { decision, comments } }, {
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
