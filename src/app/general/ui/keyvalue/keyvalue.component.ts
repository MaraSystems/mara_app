import { Component, EventEmitter, Input, Output, ElementRef } from '@angular/core';
import { InputComponent } from '../input/input.component';

@Component({
  selector: 'app-keyvalue',
  templateUrl: './keyvalue.component.html',
  styleUrls: ['./keyvalue.component.scss']
})
export class KeyvalueComponent extends InputComponent {
  @Input() icon!: string;
  @Input() value!: string | null | number | Date;
  @Input() list!: string[];

  @Output() clickEvent = new EventEmitter<string>();

  constructor (
    public override host: ElementRef<HTMLElement>
  ){
    super(host);
  }

  getValue() {
    return this.control ? this.control.value : this.value;
  }
}
