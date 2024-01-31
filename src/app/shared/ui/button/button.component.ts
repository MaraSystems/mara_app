import { AfterContentInit, AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent implements AfterViewInit{
  @Input() text = 'Button';
  @Input () textSize = '1.25rem';
  @Input() textColor = '#000000';
  @Input() background = '#FFFFFF';
  @Input() elevated = false;
  @Input() borderColor = '';
  @Input() icon = '';
  @Input () iconColor = '#FFF000';
  @Input() link = '';
  @Input() svg = '';

  @Output() onClick = new EventEmitter<string>();

  constructor(
    private element: ElementRef
  ) {}

  ngAfterViewInit(): void {
    if (this.svg) {
      const [path] = this.element.nativeElement.getElementsByTagName('path');
      path.setAttribute('d', this.svg);
      path.setAttribute('fill', this.iconColor);
    }
  }
}
