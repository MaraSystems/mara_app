import { Component, EventEmitter, Input, OnInit, Output, forwardRef } from '@angular/core';
import { InputComponent } from '../input/input.component';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-keyvalue',
  templateUrl: './keyvalue.component.html',
  styleUrls: ['./keyvalue.component.scss']
})
export class KeyvalueComponent extends InputComponent {
  @Input() edit = false;
  @Input() icon!: string;
  @Input() value!: string | null | number;
  @Input() list!: string[];

  @Output() clickEvent = new EventEmitter<string>();

  constructor (){
    super();
  }

  getValue() {    
    return this.control ? this.control.value : this.value;
  }
}
