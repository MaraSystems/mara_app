import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { PopupService } from 'src/app/shared/features/popup/features/popup.service';
import { DocumentData } from 'src/app/shared/utils/models/document-data';
import { UnSubscriber } from 'src/app/shared/utils/services/unsubscriber.service';
import { GetDocumentAction, ListDocumentsAction } from 'src/app/shared/utils/store/document/document-store.action';
import { selectDocumentByModelId } from 'src/app/shared/utils/store/document/document-store.selector';

@Component({
  selector: 'app-project-document-list',
  templateUrl: './project-document-list.component.html',
  styleUrls: ['./project-document-list.component.scss']
})
export class ProjectDocumentListComponent extends UnSubscriber implements OnInit {
  @Input() modelId!: string;
  documents!: DocumentData[];

  constructor(
    public store: Store,
    public popupService: PopupService
  ){
    super();
  }

  ngOnInit(): void {
    this.store.dispatch(new ListDocumentsAction('project-document', this.modelId));

    this.newSubscription = this.store.select(selectDocumentByModelId('project-document', this.modelId)).subscribe(documents => {
      this.documents = documents;      
    });
  }
}
