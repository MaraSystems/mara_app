import { Component, ElementRef } from '@angular/core';
import { InputComponent } from '../input/input.component';

@Component({
  selector: 'app-text-area',
  templateUrl: './text-area.component.html',
  styleUrls: ['./text-area.component.scss']
})
export class TextAreaComponent extends InputComponent {
constructor(
  override host: ElementRef<HTMLElement>
) {
  super(host);
}

public override onDocumentClick(event: MouseEvent) {
  const clicked = this.host.nativeElement.contains(event.target as Node);
  if (clicked) {
    this.focus();
  } else {
    this.blur();
  }
}

override ngOnInit(): void {
  super.ngOnInit();
  this.controlElement = this.host.nativeElement.querySelector('.form-control-data') as HTMLElement;
}
}
