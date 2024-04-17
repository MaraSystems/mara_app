import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { DocumentData } from 'src/app/shared/utils/models/document-data';
import { UnSubscriber } from 'src/app/shared/utils/services/unsubscriber.service';
import { GetDocumentAction } from 'src/app/shared/utils/store/document/document-store.action';
import { selectDocumentById } from 'src/app/shared/utils/store/document/document-store.selector';

@Component({
  selector: 'app-project-document-item',
  templateUrl: './project-document-item.component.html',
  styleUrls: ['./project-document-item.component.scss']
})
export class ProjectDocumentItemComponent extends UnSubscriber implements OnInit {
  @Input() id!: string;
  documentData!: DocumentData;

  constructor(
    public store: Store
  ){
    super();
  }

  ngOnInit(): void {
    this.store.dispatch(new GetDocumentAction(this.id));

    this.newSubscription = this.store.select(selectDocumentById(this.id)).subscribe(documentData => {      
      this.documentData = documentData;            
    });
  }
}
