import { Component, ElementRef, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormControl } from '@angular/forms';
import { InputComponent } from '../input/input.component';

@Component({
  selector: 'app-text-input',
  templateUrl: './text-input.component.html',
  styleUrls: ['./text-input.component.scss'],
})
export class TextInputComponent extends InputComponent {

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
