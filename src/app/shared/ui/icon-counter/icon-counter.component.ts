import { Component, ElementRef, Input, OnInit, inject } from '@angular/core';

@Component({
  selector: 'app-icon-counter',
  templateUrl: './icon-counter.component.html',
  styleUrls: ['./icon-counter.component.scss']
})
export class IconCounterComponent implements OnInit{
  @Input() icon!: string;
  @Input() value!: number;
  @Input() active = false;
  @Input() flat = false;

  constructor(
    public elementRef: ElementRef
  ){}

  ngOnInit(): void {
    const element: HTMLElement = this.elementRef.nativeElement;
    element.style.flexDirection = this.flat ? 'row' : 'column';
    // element.style.boxShadow = this.flat ? 'none' : 'var(--shadow-medium)';
  }
}
