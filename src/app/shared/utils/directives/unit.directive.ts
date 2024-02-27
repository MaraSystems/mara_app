import { Directive, ElementRef, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[unit]'
})
export class UnitDirective implements OnInit {
  @Input() unit!: string;
  node = document.createElement('span');

  constructor(
    private el: ElementRef
  ) { }

  ngOnInit(): void {
    this.node.textContent = `${this.unit}`;
    this.node.classList.add('unit');
    this.el.nativeElement.append(this.node);
    this.el.nativeElement.classList.add('unit-container')
  }
}
