import { Directive, ElementRef, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[currency]'
})
export class UnitDirective implements OnInit {
  @Input() amount!: string;
  node = document.createElement('span');

  constructor(
    private el: ElementRef
  ) { }

  ngOnInit(): void {
    this.node.textContent = `${this.amount}`;
    this.node.classList.add('unit');
    this.el.nativeElement.append(this.node);
    this.el.nativeElement.classList.add('unit-container')
  }
}
