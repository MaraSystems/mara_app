import { Component, ElementRef, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { Store } from '@ngrx/store';
import { BaseComponent } from 'src/app/general/utils/services/basecomponent.service';
import { ListCommentsAction } from '../../utils/store/comment-store.action';
import { selectCommentsByModelId } from '../../utils/store/comment-store.selector';
import { Comment } from '../../utils/models/comment';
import { CommentType } from '../../utils/models/comment-type';
import { CommentPage } from '../../utils/models/comment-page';

@Component({
  selector: 'app-comment-list',
  templateUrl: './comment-list.component.html',
  styleUrls: ['./comment-list.component.scss']
})
export class CommentListComponent extends BaseComponent implements OnInit {
  @Input() model!: CommentType;
  @Input() modelId = '';
  @Output() commented = new EventEmitter<string>();

  comments: Comment[] = [];
  pages: CommentPage[] = [];
  commentModel = CommentType.COMMENT;

  constructor(
    public store: Store,
    public elementRef: ElementRef
  ){
    super();
  }

  ngOnInit(): void {    
    this.addPage(this.model, this.modelId);
    const popup: Element = this.elementRef.nativeElement.closest('.popup');    
    const [popupCover] = Array.from(popup.getElementsByClassName('popup-cover'));
    
    popupCover.addEventListener('click', () => {
      this.resetPages()
    });
  }

  addPage(model: CommentType, modelId: string) {
    this.pages.push({ model, modelId });
    this.showPage(model, modelId);    
  }

  removePage() {
    this.pages.pop();
    const [{ model, modelId }, ..._] = [...this.pages].reverse();
    this.showPage(model, modelId);
  }

  showPage(model: CommentType, modelId: string) {
    this.model = model;
    this.modelId = modelId;

    this.store.dispatch(new ListCommentsAction(model, modelId));

    this.newSubscription = this.store.select(selectCommentsByModelId(model, modelId)).subscribe(comments => {      
      this.comments = comments.reverse();     
      // this.scrollDown(); 
    });
  }

  resetPages() {        
    const [{ model, modelId }, ..._] = this.pages;
    this.pages = [];
    this.addPage(model, modelId);
  }

  scrollDown() {
    const element: Element = this.elementRef.nativeElement;
    const [listElement] = Array.from(element.getElementsByClassName('list'));    
    listElement.scrollTo({ top: listElement.scrollHeight });
  }
}
