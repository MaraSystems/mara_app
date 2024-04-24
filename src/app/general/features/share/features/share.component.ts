import { Component, ComponentRef, ElementRef, Input, OnInit, Type } from '@angular/core';

@Component({
  selector: 'app-share',
  templateUrl: './share.component.html',
  styleUrls: ['./share.component.scss']
})
export class ShareComponent implements OnInit {
  @Input() name!: string;
  @Input() component!: Type<any>;
  @Input() data!: any;

  componentHolder!: ComponentRef<any>;
  element!: HTMLElement;

  constructor(
    private el: ElementRef,
  ) { }

  ngOnInit(): void {
  }
}
