import { Component, ElementRef, Input, OnInit } from '@angular/core';
import { UnSubscriber } from '../../utils/services/unsubscriber.service';

@Component({
  selector: 'app-frame',
  templateUrl: './frame.component.html',
  styleUrls: ['./frame.component.scss']
})
export class FrameComponent extends UnSubscriber implements OnInit {
  @Input() url = '';
  frameDocument!: Document;

  constructor(
    private el: ElementRef
  ){
    super();
  }

  ngOnInit(): void {
    const element: Element = this.el.nativeElement;
    const [frame] = Array.from(element.getElementsByTagName('iframe'));
    this.frameDocument = frame.contentDocument as Document;    
  }
}
