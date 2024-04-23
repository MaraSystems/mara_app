import { Component, ElementRef, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { Store } from '@ngrx/store';
import { UnSubscriber } from 'src/app/general/utils/services/unsubscriber.service';
import { ListCommentsAction } from '../../utils/store/comment-store.action';
import { selectCommentsByModelId } from '../../utils/store/comment-store.selector';
import { Comment } from '../../utils/models/comment.model';
import { CommentEnum } from '../../utils/models/comment.enum';
import { CommentPage } from '../../utils/models/comment.page';

@Component({
  selector: 'app-comment-list',
  templateUrl: './comment-list.component.html',
  styleUrls: ['./comment-list.component.scss']
})
export class CommentListComponent extends UnSubscriber implements OnInit {
  @Input() model!: CommentEnum;
  @Input() modelId = '';

  comments: Comment[] = [];
  pages: CommentPage[] = [];
  commentModel = CommentEnum.COMMENT;

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

  addPage(model: CommentEnum, modelId: string) {
    this.pages.push({ model, modelId });
    this.showPage(model, modelId);    
  }

  removePage() {
    this.pages.pop();
    const [{ model, modelId }, ..._] = [...this.pages].reverse();
    this.showPage(model, modelId);
  }

  showPage(model: CommentEnum, modelId: string) {
    this.model = model;
    this.modelId = modelId;

    this.store.dispatch(new ListCommentsAction(model, modelId));

    this.newSubscription = this.store.select(selectCommentsByModelId(model, modelId)).subscribe(comments => {      
      this.comments = comments;      
    });
  }

  resetPages() {        
    const [{ model, modelId }, ..._] = this.pages;
    this.pages = [];
    this.addPage(model, modelId);
  }
}
