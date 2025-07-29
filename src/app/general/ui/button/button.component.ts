import { Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges, inject } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent implements OnInit, OnChanges{
  @Input() icon!: string;
  @Input() text!: string;
  @Input() disabled = false;
  @Input() elevated = false;
  @Input() color = 'var(--color-light)';
  @Input() bgColor = 'var(--color-primary)';

  element!: HTMLElement;

  constructor(
    public elementRef: ElementRef
  ){
    this.element = this.elementRef.nativeElement;
  }

  ngOnInit(): void {
    this.element.style.backgroundColor = this.bgColor;
    this.element.style.color = this.color;
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.element.classList.remove('elevated');
    this.element.classList.remove('disabled');

    if (changes['elevated']?.currentValue) {
      this.element.classList.add('elevated');
    }

    if (changes['disabled']?.currentValue) {
      this.element.classList.add('disabled');
    }
  }
}
