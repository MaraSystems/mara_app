import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { DocumentData } from 'src/app/shared/utils/models/document-data';
import { UnSubscriber } from 'src/app/shared/utils/services/unsubscriber.service';
import { GetDocumentAction, ListDocumentsAction } from 'src/app/shared/utils/store/document/document-store.action';

@Component({
  selector: 'app-project-document-list',
  templateUrl: './project-document-list.component.html',
  styleUrls: ['./project-document-list.component.scss']
})
export class ProjectDocumentListComponent extends UnSubscriber implements OnInit {
  @Input() id!: string;
  document!: DocumentData;

  constructor(
    public store: Store
  ){
    super();
  }

  ngOnInit(): void {
    this.store.dispatch(new ListDocumentsAction('projects', this.id));
  }
}
