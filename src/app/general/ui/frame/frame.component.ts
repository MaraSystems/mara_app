import { Component, ElementRef, Input, OnInit } from '@angular/core';
import { BaseComponent } from '../../utils/services/basecomponent.service';

@Component({
  selector: 'app-frame',
  templateUrl: './frame.component.html',
  styleUrls: ['./frame.component.scss']
})
export class FrameComponent extends BaseComponent implements OnInit {
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
